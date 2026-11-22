import { Router, Request, Response } from 'express';

const router = Router();

router.post('/login', (req: Request, res: Response) => {
  const { email } = req.body;
  res.json({
    token: 'sb_jwt_demo_token_secops_hardened_98721',
    user: {
      id: 'usr_devops_lead',
      name: 'DevOps Lead Engineer',
      email: email || 'lead@snapbrand.cloud',
      role: 'Platform Architect',
      plan: 'Enterprise Pro',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    }
  });
});

export default router;
