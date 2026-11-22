import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/server';

describe('SnapBrand Microservice Health & API Suite', () => {
  it('GET /health returns 200 with healthy status and subsystem states', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body.service).toBe('snapbrand-api');
    expect(res.body.checks.database).toBe('connected');
  });

  it('GET /metrics returns telemetry and performance counters', async () => {
    const res = await request(app).get('/metrics');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.p95LatencyMs).toBeDefined();
  });

  it('GET /api/v1/templates returns curated brand blueprints', async () => {
    const res = await request(app).get('/api/v1/templates');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].theme).toBeDefined();
  });

  it('GET /api/v1/render/og synthesizes vector SVG asset', async () => {
    const res = await request(app)
      .get('/api/v1/render/og')
      .query({ title: 'Test Title', theme: 'sunset', badge: 'CI TEST' })
      .buffer(true);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('image/svg+xml');
    const content = res.text || res.body?.toString?.() || '';
    expect(content).toContain('<svg');
    expect(content).toContain('Test Title');
  });

  it('POST /api/v1/auth/login validates credentials and issues session token', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'evaluator@fast.nu.edu.pk' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.role).toBe('Platform Architect');
  });

  it('GET /api/v1/audit provides DevSecOps security audit logs', async () => {
    const res = await request(app).get('/api/v1/audit');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].action).toBeDefined();
  });
});
