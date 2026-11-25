# Incident drill and post-incident note

Run the drill, then replace the bracketed fields with what was actually observed (screenshots go in the report).

## How to run

```bash
./scripts/incident_demo.sh inject     # simulates a bad release: new instances answer /health with 503
# watch: CloudWatch dashboard, alarm snapbrand-prod-unhealthy-targets, the SNS email
# diagnose with logs + metrics (below), then:
./scripts/incident_demo.sh fix
```

## Diagnosis steps

1. The alarm email names `snapbrand-prod-unhealthy-targets`.
2. Dashboard: `UnHealthyHostCount` rises while `HealthyHostCount` drops; request rate is stable because the remaining old instance still serves (rolling deploy keeps 50 percent healthy).
3. Logs: CloudWatch Logs Insights on `/snapbrand/backend`:
   `fields @timestamp, @message | filter @message like /503/ | sort @timestamp desc`
   The new instance's `/health` calls return 503 with `"status":"unhealthy"`.
4. Cause: environment flag `SIMULATE_FAILURE=true` was set in the release configuration (SSM `/snapbrand/simulate-failure`).

## Post-incident note (template)

* **Summary:** [time] a deliberately bad release made new backend instances report unhealthy.
* **Impact:** [none/limited] because the ASG refresh keeps at least 50 percent of instances healthy and the ALB only routes to healthy targets.
* **Detection:** CloudWatch alarm `unhealthy-targets` fired at [time]; SNS email received at [time].
* **Root cause:** [simulated failure flag in release config].
* **Fix:** `incident_demo.sh fix` reset the flag and re-rolled the fleet; targets returned healthy at [time]. Alternative fix: roll back to the previous image tag with the Manual Deployment Rollback workflow.
* **Follow-up:** deploy-time health gates already prevent a full outage; consider ALB-side auto-rollback via instance-refresh checkpoints.
