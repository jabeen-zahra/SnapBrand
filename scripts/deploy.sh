#!/usr/bin/env bash
# Rolling deployment of an image tag to the Auto Scaling Group.
#   usage: deploy.sh <image-tag>
# Verifies the tag exists in ECR, publishes the tag + production compose file to
# SSM Parameter Store, then starts an ASG instance refresh (min 50% healthy) and
# waits for it to finish. Writes previous_tag to $GITHUB_OUTPUT when running in CI.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib.sh
source "$SCRIPT_DIR/lib.sh"

TAG="${1:-}"
[ -n "$TAG" ] || die "usage: deploy.sh <image-tag>"
require_tools aws
COMPOSE_FILE="${COMPOSE_FILE:-$SCRIPT_DIR/../docker-compose.prod.yml}"
TIMEOUT_SECONDS="${TIMEOUT_SECONDS:-1500}"

for repo in snapbrand-frontend snapbrand-backend; do
  aws ecr describe-images --repository-name "$repo" --image-ids "imageTag=$TAG" >/dev/null 2>&1 ||
    die "image tag '$TAG' not found in ECR repository $repo"
done

PREVIOUS_TAG="$(ssm_get /snapbrand/image-tag)"
log "previous tag: $PREVIOUS_TAG -> new tag: $TAG"
if [ -n "${GITHUB_OUTPUT:-}" ]; then
  echo "previous_tag=$PREVIOUS_TAG" >>"$GITHUB_OUTPUT"
fi

aws ssm put-parameter --name /snapbrand/compose --type String --overwrite \
  --value "file://$COMPOSE_FILE" >/dev/null
aws ssm put-parameter --name /snapbrand/image-tag --type String --overwrite \
  --value "$TAG" >/dev/null

log "starting rolling instance refresh on $ASG_NAME (MinHealthyPercentage=50)"
REFRESH_ID="$(aws autoscaling start-instance-refresh \
  --auto-scaling-group-name "$ASG_NAME" \
  --preferences '{"MinHealthyPercentage":50,"InstanceWarmup":120}' \
  --query InstanceRefreshId --output text)"
log "instance refresh id: $REFRESH_ID"

deadline=$((SECONDS + TIMEOUT_SECONDS))
while [ "$SECONDS" -lt "$deadline" ]; do
  STATUS="$(aws autoscaling describe-instance-refreshes \
    --auto-scaling-group-name "$ASG_NAME" --instance-refresh-ids "$REFRESH_ID" \
    --query 'InstanceRefreshes[0].[Status,PercentageComplete]' --output text)"
  log "refresh status: $STATUS"
  case "$STATUS" in
    Successful*)
      log "deployment of $TAG complete"
      exit 0
      ;;
    Failed* | Cancel* | RollbackSuccessful*) die "instance refresh ended with: $STATUS" ;;
  esac
  sleep 20
done
die "timed out waiting for instance refresh $REFRESH_ID"
