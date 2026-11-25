#!/usr/bin/env bash
# Shared helpers sourced by the deployment scripts.
set -euo pipefail

: "${AWS_REGION:=ap-southeast-2}"
: "${ENV_NAME:=snapbrand-prod}"
: "${ASG_NAME:=${ENV_NAME}-asg}"
export AWS_REGION AWS_DEFAULT_REGION="$AWS_REGION"

log() { printf '[%s] %s\n' "$(date -u +%H:%M:%S)" "$*"; }
die() {
  log "ERROR: $*" >&2
  exit 1
}

require_tools() {
  local tool
  for tool in "$@"; do
    command -v "$tool" >/dev/null 2>&1 || die "required tool not found: $tool"
  done
}

# Prints the SSM parameter value, or "none" when it does not exist yet.
ssm_get() {
  aws ssm get-parameter --name "$1" --query Parameter.Value --output text 2>/dev/null || echo "none"
}
