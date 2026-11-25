#!/usr/bin/env bash
# Create/update the whole AWS platform from infra/cloudformation.yml.
#   usage: deploy_stack.sh <alert-email> [create-oidc-provider=true|false] [existing-oidc-arn]
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib.sh
source "$SCRIPT_DIR/lib.sh"

ALERT_EMAIL="${1:-}"
CREATE_OIDC="${2:-true}"
EXISTING_OIDC="${3:-}"
[ -n "$ALERT_EMAIL" ] || die "usage: deploy_stack.sh <alert-email> [true|false] [existing-oidc-arn]"
require_tools aws

aws cloudformation deploy \
  --stack-name "$ENV_NAME" \
  --template-file "$SCRIPT_DIR/../infra/cloudformation.yml" \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
  "EnvironmentName=$ENV_NAME" \
  "AlertEmail=$ALERT_EMAIL" \
  "CreateOIDCProvider=$CREATE_OIDC" \
  "ExistingOIDCProviderArn=$EXISTING_OIDC"

log "stack outputs:"
aws cloudformation describe-stacks --stack-name "$ENV_NAME" \
  --query 'Stacks[0].Outputs[].[OutputKey,OutputValue]' --output table
log "Next: set GitHub repo variables AWS_CI_ROLE_ARN, AWS_DEPLOY_ROLE_ARN and ALB_URL from the outputs above,"
log "confirm the SNS subscription email, then push to main to deploy the first image."
