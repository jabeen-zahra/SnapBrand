import { Router, Request, Response } from 'express';

const router = Router();

const AUDIT_EVENTS = [
  {
    id: 'evt-1092',
    action: 'ECR_IMAGE_PULL',
    actor: 'ASG Instance az-east-1a (i-08a91bc7)',
    ip: '10.0.10.45',
    status: 'SUCCESS',
    details: 'Pulled immutable container digest sha256:d89ac0... from ECR',
    timestamp: new Date(Date.now() - 120000).toISOString()
  },
  {
    id: 'evt-1091',
    action: 'SYNTHETIC_SMOKE_PASS',
    actor: 'GitHub Actions Stage 12 Runner',
    ip: '54.210.88.19',
    status: 'SUCCESS',
    details: 'Verified /health and /api/v1/render/og endpoints (latency: 14ms)',
    timestamp: new Date(Date.now() - 360000).toISOString()
  },
  {
    id: 'evt-1090',
    action: 'SECRETS_OIDC_ASSUME_ROLE',
    actor: 'arn:aws:iam::123456789:role/SnapBrandCIRole',
    ip: '140.82.115.7',
    status: 'SUCCESS',
    details: 'Assumed ephemeral deployment session with bounded session policies',
    timestamp: new Date(Date.now() - 600000).toISOString()
  },
  {
    id: 'evt-1089',
    action: 'DYNAMIC_OG_RENDER',
    actor: 'Twitterbot/1.0 Crawler',
    ip: '199.16.157.180',
    status: 'CACHE_HIT',
    details: 'Returned cached vector SVG master from Redis in 4.2ms',
    timestamp: new Date(Date.now() - 900000).toISOString()
  }
];

router.get('/', (req: Request, res: Response) => {
  res.json(AUDIT_EVENTS);
});

export default router;
