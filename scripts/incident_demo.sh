#!/usr/bin/env bash
# Deliberate-failure drill for the observability requirement.
#   usage: incident_demo.sh inject|fix
# inject: new instances report /health 503 (simulated bad release) -> UnHealthyHost alarm fires.
# fix:    restores normal behaviour and re-rolls the fleet.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib.sh
source "$SCRIPT_DIR/lib.sh"

ACTION="${1:-}"
require_tools aws
case "$ACTION" in
  inject) VALUE=true ;;
  fix) VALUE=false ;;
  *) die "usage: incident_demo.sh inject|fix" ;;
esac

aws ssm put-parameter --name /snapbrand/simulate-failure --type String --overwrite --value "$VALUE" >/dev/null
aws autoscaling cancel-instance-refresh --auto-scaling-group-name "$ASG_NAME" >/dev/null 2>&1 || true
sleep 15
aws autoscaling start-instance-refresh --auto-scaling-group-name "$ASG_NAME" \
  --preferences '{"MinHealthyPercentage":50,"InstanceWarmup":120}' >/dev/null
log "simulate-failure=$VALUE and rolling refresh started. Watch the dashboard and the alarm."
