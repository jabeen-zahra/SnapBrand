#!/usr/bin/env bash
# Roll the fleet back to a previous image tag (same rolling mechanism as deploy.sh).
#   usage: rollback.sh <previous-image-tag>
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib.sh
source "$SCRIPT_DIR/lib.sh"

TAG="${1:-}"
[ -n "$TAG" ] || die "usage: rollback.sh <previous-image-tag>"
[ "$TAG" != "none" ] || die "no previous release recorded; nothing to roll back to"

# Cancel an in-flight refresh first so the rollback can start immediately.
aws autoscaling cancel-instance-refresh --auto-scaling-group-name "$ASG_NAME" >/dev/null 2>&1 || true
sleep 15
log "ROLLBACK to image tag $TAG"
exec "$SCRIPT_DIR/deploy.sh" "$TAG"
