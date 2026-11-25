#!/usr/bin/env bash
# Failure-tolerance demo: terminate one instance while polling the load balancer.
#   usage: demo_failover.sh <alb-url> [duration-seconds]
# Evidence: HTTP status log (stays 200) + ASG replacing the terminated instance.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib.sh
source "$SCRIPT_DIR/lib.sh"

URL="${1:-}"
DURATION="${2:-300}"
[ -n "$URL" ] || die "usage: demo_failover.sh <alb-url> [duration-seconds]"
require_tools aws curl

VICTIM="$(aws autoscaling describe-auto-scaling-groups --auto-scaling-group-names "$ASG_NAME" \
  --query "AutoScalingGroups[0].Instances[?LifecycleState=='InService'].InstanceId | [0]" --output text)"
{ [ -n "$VICTIM" ] && [ "$VICTIM" != "None" ]; } || die "no in-service instance found"

log "terminating $VICTIM (ASG will launch a replacement)"
aws autoscaling terminate-instance-in-auto-scaling-group \
  --instance-id "$VICTIM" --no-should-decrement-desired-capacity >/dev/null

ok=0
bad=0
end=$((SECONDS + DURATION))
while [ "$SECONDS" -lt "$end" ]; do
  code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 3 "$URL/health" || echo 000)"
  if [ "$code" = "200" ]; then ok=$((ok + 1)); else bad=$((bad + 1)); fi
  log "GET /health -> $code   (ok=$ok failed=$bad)"
  sleep 3
done
log "summary: $ok successful, $bad failed requests during recovery"
aws autoscaling describe-scaling-activities --auto-scaling-group-name "$ASG_NAME" --max-items 5 \
  --query 'Activities[].[StartTime,StatusCode,Description]' --output table
