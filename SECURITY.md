# Security Policy & DevSecOps Standard

## Overview
SnapBrand adheres to strict DevSecOps and zero-trust engineering principles. Security verification is baked directly into the development lifecycle, preventing unverified or vulnerable artifacts from reaching staging or production cloud environments.

---

## Automated CI/CD Security Gates

Every push and pull request must satisfy the following automated security criteria across Stages 1–10:

### 1. Secret Scanning (Gitleaks)
* **Scope**: Scans entire git history on every pull request.
* **Failure Rule**: Pipeline **strictly fails** upon discovery of any high-entropy secret, API token, private key, AWS key (`AKIA...`), or credential pattern.
* **Policy**: Zero secret storage in git. All runtime secrets are fetched via AWS Secrets Manager / Parameter Store and injected dynamically at deploy time via IAM OIDC.

### 2. Static Analysis & Code Quality (SonarCloud)
* **Quality Gate Criteria**:
  * 0 Security Hotspots unreviewed.
  * 0 Bugs or Critical Vulnerabilities.
  * Minimum 80% test coverage on new code.
  * Technical debt ratio < 5%.
* **Failure Rule**: Fails the PR check if SonarCloud Quality Gate status is `ERROR`.

### 3. Open-Source Dependency Scanning (Snyk)
* **Scope**: Analyzes both `frontend/package.json` and `backend/package.json` lockfiles.
* **Failure Rule**: Pipeline terminates with exit code 1 if any **High** or **Critical** vulnerability is reported without an approved remediation patch.
* **Automation**: GitHub Dependabot is enabled concurrently to submit automated bump PRs for vulnerable indirect dependencies.

### 4. Container Vulnerability Scanning (Trivy)
* **Scope**: Deep scan of built container images before pushing to Amazon ECR.
* **Severity Threshold**: `--severity HIGH,CRITICAL --exit-code 1`.
* **Policy**: Base images must be pinned to minimal, hardened versions (e.g., `alpine:3.19` or `node:20-alpine`) running under unprivileged, non-root system users (`UID 10001`).

---

## Cloud Infrastructure Security (AWS IAM & Networking)

1. **Least-Privilege IAM**:
   * **CI/CD Role**: GitHub Actions connects to AWS exclusively via **OpenID Connect (OIDC)** assuming an ephemeral IAM role with bounded session policies. No static `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY` are stored in repository secrets.
   * **EC2 Instance Profile**: Granted minimal permissions strictly required to pull ECR images and publish CloudWatch logs (`logs:PutLogEvents`, `cloudwatch:PutMetricData`).
2. **Network Perimeter Hardening**:
   * EC2 instances reside exclusively in private subnets with RFC 1918 CIDR allocations (`10.0.10.0/24`, `10.0.20.0/24`).
   * Security groups permit inbound HTTP traffic exclusively from the ALB Security Group ID.
   * **SSH (Port 22) is completely disabled**. Remote troubleshooting is conducted via **AWS Systems Manager (SSM) Session Manager** with audited command logs.

---

## Vulnerability Disclosure & Exceptions Log

If a low/moderate third-party vulnerability has no upstream fix available, it must be documented here with justification:

| Package | Version | CVE / Identifier | Severity | Justification & Risk Mitigation | Review Date |
|---|---|---|---|---|---|
| *None* | — | — | — | All dependencies and base images currently report 0 High/Critical findings. | 2026-11-22 |

---

## Reporting a Security Issue
To report a security vulnerability, please open an advisory through GitHub Security Advisories or contact the DevSecOps response team directly. PGP-encrypted disclosures are supported.