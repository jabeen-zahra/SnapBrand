# Evidence checklist for GroupX.pdf

Tick each item and paste the screenshot into the report.

## Repository and pipeline
- [ ] GitHub repo page showing workflows, Dockerfiles, compose files, scripts, SECURITY.md
- [ ] Actions run with all 12 stages as separate jobs (expanded run graph)
- [ ] A run where a security stage failed and blocked a PR (see "Demonstrate a blocked PR")
- [ ] Branch ruleset for `main`: PR + 1 review, all 10 checks required, force-push blocked
- [ ] Pull request with reviewer approval; contributors graph showing all three members
- [ ] Dependabot PRs or Security tab

## AWS
- [ ] ECR repos with tags (git SHA + `v1.0.N`) and "Immutable" tag setting
- [ ] IAM role `snapbrand-prod-ci-role` / `deploy-role` trust policy (OIDC, `sub` = main branch)
- [ ] VPC resource map, subnets in 2 AZs, route tables (private -> NAT), security groups, ASG across 2 AZs, target groups healthy
- [ ] Instances with no public IP; no SSH rule in the instance security group
- [ ] Secrets Manager secret and SSM parameters (names only)
- [ ] AWS Budget

## Demonstrations
- [ ] Failure recovery: `demo_failover.sh` output (status stays 200) + ASG activity history showing termination and replacement
- [ ] Load test: k6 summary, CloudWatch request count/CPU, ASG activity history showing scale-out then scale-in
- [ ] Commit-to-live: a commit merged to `main`, stage 11/12 green, `/health` shows the new version
- [ ] Rollback: Manual Deployment Rollback run (and/or auto-rollback after a failed smoke test), `/health` shows the old version
- [ ] CloudWatch dashboard
- [ ] Fired alarm (console + SNS email) and the incident write-up

## Demonstrate a blocked PR (stage failure)
Option A (Gitleaks): on a branch add a file containing a fake AWS key such as `AKIAIOSFODNN7EXAMPLE` with a matching secret pattern; open a PR; stage 01 fails and merging is blocked.
Option B (Trivy/Snyk): on a branch downgrade a dependency to a known vulnerable version (for example `lodash@4.17.15` in `backend/package.json`); stage 07 fails.
Close the PR without merging and force-remove the commit from history afterwards if it contains anything secret-like.

## Final PDF contents
1. Cover page with members and roll numbers
2. Architecture diagram (docs/ARCHITECTURE.md, render the Mermaid diagrams)
3. Proof of deployment (the screenshots above), live link, GitHub link
4. One-page findings report (docs/REPORT.md)
