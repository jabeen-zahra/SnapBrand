import { Request, Response, NextFunction } from "express";

interface MetricsState {
  requests: number;
  errors5xx: number;
  errors4xx: number;
  totalLatencyMs: number;
  latencies: number[];
}

const state: MetricsState = {
  requests: 0,
  errors5xx: 0,
  errors4xx: 0,
  totalLatencyMs: 0,
  latencies: [],
};

const MAX_SAMPLES = 1000;

export function metricsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const start = process.hrtime.bigint();
  res.on("finish", () => {
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    state.requests += 1;
    state.totalLatencyMs += ms;
    if (res.statusCode >= 500) state.errors5xx += 1;
    else if (res.statusCode >= 400) state.errors4xx += 1;
    state.latencies.push(ms);
    if (state.latencies.length > MAX_SAMPLES) state.latencies.shift();
  });
  next();
}

export function snapshot() {
  const sorted = [...state.latencies].sort((a, b) => a - b);
  const p95 = sorted.length
    ? sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))]
    : 0;
  const memory = process.memoryUsage();
  return {
    status: "ok",
    version: process.env.APP_VERSION || "dev",
    uptimeSeconds: Math.floor(process.uptime()),
    totalRequests: state.requests,
    errors5xx: state.errors5xx,
    errors4xx: state.errors4xx,
    avgLatencyMs: state.requests
      ? Number((state.totalLatencyMs / state.requests).toFixed(2))
      : 0,
    p95LatencyMs: Number(p95.toFixed(2)),
    memoryRssMb: Number((memory.rss / (1024 * 1024)).toFixed(2)),
    heapUsedMb: Number((memory.heapUsed / (1024 * 1024)).toFixed(2)),
  };
}
