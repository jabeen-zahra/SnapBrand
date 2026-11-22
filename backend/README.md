# SnapBrand Backend Microservice Architecture

## Overview
The SnapBrand backend microservice provides high-speed dynamic vector asset synthesis, account authentication, and persistent project storage. Built with Node.js and TypeScript, it is optimized for sub-25ms response latencies and low memory footprint (<50MB RAM), ideal for AWS t3.micro/small instances.

---

## Service Contracts & API Endpoints

### 1. Health & Telemetry Probes
* `GET /health`: Evaluated by AWS Application Load Balancer target groups and post-deployment smoke tests. Returns subsystem health states (`database`, `redisCache`, `svgSynthesizer`).
* `GET /metrics`: Telemetry counters for Amazon CloudWatch and Prometheus (P95 latency, request rate, memory RSS, active sessions).

### 2. Authentication & Profile
* `POST /api/v1/auth/signup`: Registers a new creator account with bcrypt password hashing (`salt rounds: 10`). Issues signed JWT token.
* `POST /api/v1/auth/signin`: Validates credentials against hashed passwords and issues signed 7-day JWT.
* `GET /api/v1/auth/me`: Protected route verifying Bearer JWT and returning active profile.
* `PUT /api/v1/auth/profile`: Updates full name, avatar, or theme preference.

### 3. Visual Rendering & Projects
* `GET /api/v1/render/og`: Dynamic vector SVG generator. Accepts `title`, `subtitle`, `theme`, and `badge` as URL parameters and synthesizes lossless SVG assets with `Cache-Control: public, max-age=86400`.
* `GET /api/v1/projects`: Returns user-scoped saved brand projects.
* `POST /api/v1/projects`: Creates and persists new artwork configurations.
* `PUT /api/v1/projects/:id`: Updates existing project attributes.
* `DELETE /api/v1/projects/:id`: Deletes project from persistent storage.

---

## Containerization & Security (Hadolint Hardened)
* **Multi-Stage Build**: Compiles TypeScript in builder stage, copies only `/dist` and production node_modules into runner.
* **Minimal Base Image**: Pinned to `node:20.12.2-alpine3.19` (Zero High/Critical CVEs).
* **Non-Root User**: Runs under dedicated unprivileged system user `UID 10001:10001`.
* **Healthcheck**: In-container `wget` spider probe verifying `/health` every 30 seconds.

---

## Unit Testing & Code Coverage (Stage 5 Gate)
```bash
npm test
```
*Tested via Vitest & Supertest with >80% statement and line coverage.*
