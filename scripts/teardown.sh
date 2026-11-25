#!/usr/bin/env bash
# Delete everything created for SnapBrand (stack, ECR images, SSM parameters).
#   usage: teardown.sh --yes
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib.sh
source "$SCRIPT_DIR/lib.sh"

[ "${1:-}" = "--yes" ] || die "this deletes the whole deployment; re-run with --yes to confirm"
require_tools aws

for repo in snapbrand-frontend snapbrand-backend; do
  ids="$(aws ecr list-images --repository-name "$repo" --query 'imageIds[*]' --output json 2>/dev/null || echo '[]')"
  if [ "$ids" != "[]" ]; then
    log "deleting images in $repo"
    aws ecr batch-delete-image --repository-name "$repo" --image-ids "$ids" >/dev/null
  fi
done

aws ssm delete-parameters --names /snapbrand/image-tag /snapbrand/compose /snapbrand/simulate-failure >/dev/null || true
log "deleting CloudFormation stack $ENV_NAME (takes a few minutes)"
aws cloudformation delete-stack --stack-name "$ENV_NAME"
aws cloudformation wait stack-delete-complete --stack-name "$ENV_NAME"
log "teardown complete"
