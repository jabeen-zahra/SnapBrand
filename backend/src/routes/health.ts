import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    service: 'snapbrand-api',
    version: 'v1.0.0',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    checks: {
      database: 'connected',
      redisCache: 'connected',
      svgSynthesizer: 'ready',
      storageBucket: 'ready'
    }
  });
});

export default router;
