import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/server";

describe("SnapBrand Microservice Health, Auth & Persistence Suite", () => {
  let authToken = "";

  it("GET /health returns 200 with healthy status and subsystem states", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("healthy");
    expect(res.body.service).toBe("snapbrand-api");
    expect(res.body.checks.database).toBe("connected");
  });

  it("GET /metrics returns telemetry and performance counters", async () => {
    const res = await request(app).get("/metrics");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.p95LatencyMs).toBeDefined();
  });

  it("POST /api/v1/auth/signup registers a brand new user", async () => {
    const uniqueEmail = `designer_${Date.now()}@snapbrand.io`;
    const res = await request(app).post("/api/v1/auth/signup").send({
      email: uniqueEmail,
      password: "securePassword123!",
      fullName: "Alexander Wright",
    });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(uniqueEmail);
    authToken = res.body.token;
  });

  it("POST /api/v1/auth/signin validates credentials and issues JWT", async () => {
    const res = await request(app).post("/api/v1/auth/signin").send({
      email: "creator@snapbrand.io",
      password: "password123",
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.fullName).toBe("Elena Rostova");
  });

  it("GET /api/v1/auth/me returns current user profile for valid JWT", async () => {
    const res = await request(app)
      .get("/api/v1/auth/me")
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(res.body.user.fullName).toBe("Alexander Wright");
  });

  it("GET /api/v1/projects requires authentication and returns user projects", async () => {
    // Unauthenticated request should fail with 401
    const unauth = await request(app).get("/api/v1/projects");
    expect(unauth.status).toBe(401);

    // Authenticated request
    const res = await request(app)
      .get("/api/v1/projects")
      .set("Authorization", `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /api/v1/projects creates a new design asset for the user", async () => {
    const res = await request(app)
      .post("/api/v1/projects")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "My New Vector Banner",
        theme: "cyber",
        headline: "Bold Visual Design",
        subtitle: "Created with SnapBrand Studio",
      });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("My New Vector Banner");

    // Update project
    const updateRes = await request(app)
      .put(`/api/v1/projects/${res.body.id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ name: "Updated Vector Banner Title" });
    expect(updateRes.status).toBe(200);
    expect(updateRes.body.name).toBe("Updated Vector Banner Title");
  });

  it("PUT /api/v1/auth/profile updates user details", async () => {
    const res = await request(app)
      .put("/api/v1/auth/profile")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ fullName: "Alexander Sterling" });
    expect(res.status).toBe(200);
    expect(res.body.user.fullName).toBe("Alexander Sterling");
  });

  it("GET /api/v1/render/og synthesizes vector SVG asset", async () => {
    const res = await request(app)
      .get("/api/v1/render/og")
      .query({ title: "Creative Studio", theme: "sunset", badge: "PREVIEW" })
      .buffer(true);
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toContain("image/svg+xml");
    const content = res.text || res.body?.toString?.() || "";
    expect(content).toContain("<svg");
    expect(content).toContain("Creative Studio");
  });

  it("GET /api/v1/templates/categories returns unique template categories", async () => {
    const res = await request(app).get("/api/v1/templates/categories");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.categories).toContain("github");
    expect(res.body.categories).toContain("twitter");
  });
});
