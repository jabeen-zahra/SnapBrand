import { Router, Request, Response } from 'express';

const router = Router();

let brandKit = {
  companyName: 'SnapBrand Cloud',
  tagline: 'Edge Visual Studio & Dynamic OpenGraph Engine',
  palette: {
    primary: '#ff7a18',
    secondary: '#00f2fe',
    accent: '#00e676',
    surface: '#090a0f',
    panel: '#12131c'
  },
  typography: {
    headingFont: 'Plus Jakarta Sans',
    bodyFont: 'Inter',
    codeFont: 'JetBrains Mono'
  },
  badges: ['AWS', 'Docker', 'React 19', 'TypeScript', 'DevSecOps', 'PostgreSQL', 'Redis']
};

router.get('/', (req: Request, res: Response) => {
  res.json(brandKit);
});

router.put('/', (req: Request, res: Response) => {
  brandKit = { ...brandKit, ...req.body };
  res.json({ success: true, brandKit });
});

export default router;
