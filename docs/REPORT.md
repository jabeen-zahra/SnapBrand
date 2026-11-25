# Findings report (one page, fill in the bracketed parts)

**Project:** SnapBrand, a two-service containerised app deployed on AWS with a 12-stage DevSecOps pipeline.
**Live link:** http://snapbrand-prod-alb-1271941775.ap-southeast-2.elb.amazonaws.com/  **Repository:** https://github.com/jabeen-zahra/SnapBrand

## What we learned
* Security gates only mean something when they can fail: our first version ran Snyk and SonarCloud with `continue-on-error` and Trivy with `exit-code 0`, which hid real HIGH/CRITICAL CVEs in the Alpine 3.19 base images. Making every gate blocking exposed them and forced a base image upgrade.
* A pipeline that only prints "deployed" is not delivery. Real CD needs identity (OIDC roles), a release mechanism (SSM tag + ASG instance refresh), verification (smoke test checking the deployed version) and a way back (rollback).
* High availability is a property you prove: private subnets in two AZs, ELB health checks and an ASG only matter once an instance is terminated during traffic and the app keeps answering.

## Main problems and solutions
| Problem | Solution |
|---|---|
| ASG launched and terminated many instances | Instances cloned and ran the app from git with no health-based release; replaced with image-based releases and health checks per service |
| Instances had public IPs | Moved the ASG to private subnets behind a NAT gateway and restricted the instance SG to the ALB SG |
| Hard-coded JWT secret fallback | Secret generated in Secrets Manager; backend refuses to start in production without it |
| Pipeline faked ECR push, deploy and rollback | Implemented real push (CI role), rolling deploy (deploy role) and automatic/manual rollback scripts |
| Trivy findings in base images | Upgraded to current pinned Alpine-based images; documented residual risk in SECURITY.md |

## Post-incident note (summary)
[Fill from docs/INCIDENT.md: what failed, alarm time, diagnosis from logs/metrics, fix time.]

## Impact on our understanding
* **DevOps/automation:** one commit to `main` now builds, scans, versions, ships and verifies without manual steps.
* **Security:** shifting left (secrets, SAST, dependencies, images) plus least-privilege IAM and no long-lived keys.
* **Reliability:** rolling updates, health checks and rollback limit the blast radius of a bad release.
* **Cloud infrastructure:** VPC design, NAT, security-group chaining, ASG policies and CloudWatch dashboards.

## Contributions
| Member | Roll number | Contributions |
|---|---|---|
| Jabeen Zahra | [roll no.] | [Frontend, repository setup, AWS console work, ...] |
| Mirfaq Javaid | [roll no.] | [Backend, Dockerfiles, tests, PR review, ...] |
| Fatima Ijaz | [roll no.] | [CI/CD pipeline, security tooling, infrastructure, ...] |
