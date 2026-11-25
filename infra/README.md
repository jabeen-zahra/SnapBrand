# Infrastructure

`cloudformation.yml` builds the whole platform in `ap-southeast-2`: VPC (2 public + 2 private subnets in 2 AZs, NAT), ALB with path routing, launch template + ASG (private subnets, min 2), ECR (immutable tags), IAM roles (instance, CI, deploy) with GitHub OIDC, Secrets Manager secret, CloudWatch dashboard/alarms, SNS and a budget.

Every setting is documented in the root [README](../README.md#every-configuration-choice-so-it-can-be-rebuilt-by-hand); the diagrams are in [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md).

```bash
./scripts/deploy_stack.sh you@example.com   # create/update
./scripts/teardown.sh --yes                 # delete everything
```
