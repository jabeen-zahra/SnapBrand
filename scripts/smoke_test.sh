#!/usr/bin/env bash
# Post-deployment smoke test (pipeline stage 12).
#   usage: smoke_test.sh <base-url> [expected-version]
# Exits non-zero if any probe fails; the pipeline then triggers rollback.sh.
set -euo pipefail

BASE_URL="${1:-http://localhost:5000}"
BASE_URL="${BASE_URL%/}"
EXPECTED_VERSION="${2:-}"
MAX_RETRIES="${MAX_RETRIES:-12}"
RETRY_DELAY="${RETRY_DELAY:-10}"

command -v curl >/dev/null 2>&1 || {
  echo "curl is required" >&2
  exit 2
}

probe() {
  local path="$1" expect_code="$2" must_contain="${3:-}"
  local attempt=1 code="000" body
  printf 'Probing %-34s expect %s ... ' "$path" "$expect_code"
  while [ "$attempt" -le "$MAX_RETRIES" ]; do
    body="$(mktemp)"
    code="$(curl -s -o "$body" -w '%{http_code}' --max-time 5 "$BASE_URL$path" 2>/dev/null)" || true
    code="${code:-000}"
    if [ "$code" = "$expect_code" ] && { [ -z "$must_contain" ] || grep -q "$must_contain" "$body"; }; then
      rm -f "$body"
      echo "PASS (attempt $attempt)"
      return 0
    fi
    rm -f "$body"
    attempt=$((attempt + 1))
    sleep "$RETRY_DELAY"
  done
  echo "FAIL (last HTTP $code)"
  return 1
}

echo "Smoke test target: $BASE_URL  expected version: ${EXPECTED_VERSION:-any}"
failed=0
version_match=""
if [ -n "$EXPECTED_VERSION" ]; then
  version_match="\"version\":\"$EXPECTED_VERSION\""
fi

probe /health 200 "$version_match" || failed=1
probe /api/v1/templates 200 || failed=1
probe "/api/v1/render/og?title=SmokeTest" 200 || failed=1
probe / 200 || failed=1

if [ "$failed" -ne 0 ]; then
  echo "SMOKE TEST FAILED" >&2
  exit 1
fi
echo "SMOKE TEST PASSED"
