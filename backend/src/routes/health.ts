import { Router, Request, Response } from "express";
import { isStorageWritable } from "../db";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const storage = isStorageWritable();
  // SIMULATE_FAILURE is used for the deliberate-failure / rollback demo.
  const forcedFailure = process.env.SIMULATE_FAILURE === "true";
  const healthy = storage && !forcedFailure;

  res.status(healthy ? 200 : 503).json({
    status: healthy ? "healthy" : "unhealthy",
    service: "snapbrand-api",
    version: process.env.APP_VERSION || "dev",
    environment: process.env.NODE_ENV || "production",
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    checks: {
      database: storage ? "connected" : "unavailable",
      svgSynthesizer: "ready",
    },
  });
});

export default router;
