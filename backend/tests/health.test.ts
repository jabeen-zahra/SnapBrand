import { describe, it, expect, afterEach } from "vitest";
import request from "supertest";
import app from "../src/server";

describe("Health and metrics behaviour", () => {
  afterEach(() => {
    delete process.env.SIMULATE_FAILURE;
    delete process.env.APP_VERSION;
  });

  it("reports the deployed version in /health", async () => {
    process.env.APP_VERSION = "v9.9.9";
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.version).toBe("v9.9.9");
  });

  it("returns 503 when failure simulation is enabled", async () => {
    process.env.SIMULATE_FAILURE = "true";
    const res = await request(app).get("/health");
    expect(res.status).toBe(503);
    expect(res.body.status).toBe("unhealthy");
  });

  it("counts requests and errors in /metrics", async () => {
    await request(app).get("/api/v1/projects");
    const res = await request(app).get("/metrics");
    expect(res.status).toBe(200);
    expect(res.body.totalRequests).toBeGreaterThan(0);
    expect(res.body.errors4xx).toBeGreaterThan(0);
    expect(typeof res.body.p95LatencyMs).toBe("number");
  });
});
