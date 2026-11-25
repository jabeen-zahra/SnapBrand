#!/usr/bin/env bash
# ==============================================================================
# SnapBrand Pre-Commit Verification & Quality Gate
# Enforces strict error trapping: set -euo pipefail
# Validated with ShellCheck
# ==============================================================================
set -euo pipefail

CYAN='\033[0;36m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

trap 'echo -e "\n${RED}✗ Check failed at line ${LINENO}. Pre-commit verification aborted.${NC}"' ERR

echo -e "${CYAN}====================================================${NC}"
echo -e "${CYAN}   SnapBrand DevSecOps Local Verification Suite     ${NC}"
echo -e "${CYAN}====================================================${NC}"

# 1. ShellCheck Verification
echo -e "\n${YELLOW}[Stage 1/5] Checking shell scripts with ShellCheck...${NC}"
if command -v shellcheck >/dev/null 2>&1; then
    shellcheck -x -P SCRIPTDIR scripts/*.sh
    echo -e "${GREEN}✓ All shell scripts passed ShellCheck validation.${NC}"
else
    echo -e "${YELLOW}! ShellCheck not found on host. Skipping local lint.${NC}"
fi

# 2. Secret Scan Verification
echo -e "\n${YELLOW}[Stage 2/5] Checking repository for secrets with Gitleaks...${NC}"
if command -v gitleaks >/dev/null 2>&1; then
    gitleaks detect --source . --verbose --no-git
    echo -e "${GREEN}✓ Zero secrets detected in local workspace.${NC}"
else
    echo -e "${YELLOW}! Gitleaks not found on host. Skipping local secret check.${NC}"
fi

# 3. Code Formatting & Linting
echo -e "\n${YELLOW}[Stage 3/5] Running ESLint & Prettier verification...${NC}"
if [ -d "frontend/node_modules" ]; then
    npm --prefix frontend run lint
    echo -e "${GREEN}✓ Frontend linting passed.${NC}"
fi

if [ -d "backend/node_modules" ]; then
    npm --prefix backend run lint
    echo -e "${GREEN}✓ Backend linting passed.${NC}"
fi

# 4. Automated Tests & Coverage
echo -e "\n${YELLOW}[Stage 4/5] Executing automated unit test suites...${NC}"
if [ -d "backend/node_modules" ]; then
    npm --prefix backend test -- --coverage
    echo -e "${GREEN}✓ Backend unit test suite passed with coverage threshold satisfied.${NC}"
fi

# 5. Dockerfile Linting
echo -e "\n${YELLOW}[Stage 5/5] Linting Dockerfiles with Hadolint...${NC}"
if command -v hadolint >/dev/null 2>&1; then
    hadolint frontend/Dockerfile
    hadolint backend/Dockerfile
    echo -e "${GREEN}✓ All Dockerfiles satisfied best-practice linting.${NC}"
fi

echo -e "\n${GREEN}====================================================${NC}"
echo -e "${GREEN}   ✓ All pre-commit checks successfully passed!     ${NC}"
echo -e "${GREEN}====================================================${NC}"
