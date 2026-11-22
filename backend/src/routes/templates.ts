import { Router, Request, Response } from 'express';

const router = Router();

export interface Template {
  id: string;
  title: string;
  category: 'github' | 'twitter' | 'opengraph' | 'producthunt' | 'badges';
  width: number;
  height: number;
  theme: 'cyber' | 'sunset' | 'obsidian' | 'emerald' | 'minimal';
  headline: string;
  subtitle: string;
  badge: string;
}

export const SEED_TEMPLATES: Template[] = [
  {
    id: 'gh-devops-01',
    title: 'DevOps Multi-AZ Master',
    category: 'github',
    width: 1280,
    height: 640,
    theme: 'cyber',
    headline: 'High Availability Multi-AZ Cloud',
    subtitle: 'Zero-downtime ASG cluster with 12-Stage DevSecOps Pipeline',
    badge: 'AWS CLOUD'
  },
  {
    id: 'og-saas-02',
    title: 'Silicon Valley SaaS Launch',
    category: 'opengraph',
    width: 1200,
    height: 630,
    theme: 'sunset',
    headline: 'SnapBrand v2.4 Release',
    subtitle: 'Generate studio-grade vector assets and dynamic edge OpenGraph cards',
    badge: 'NEW LAUNCH'
  },
  {
    id: 'tw-minimal-03',
    title: 'Obsidian Minimalist Header',
    category: 'twitter',
    width: 1500,
    height: 500,
    theme: 'obsidian',
    headline: 'Engineering at Terminal Speed',
    subtitle: 'TypeScript, Kubernetes, Terraform & Distributed Systems',
    badge: 'DEV CREW'
  },
  {
    id: 'ph-badge-04',
    title: 'Product Hunt Featured Badge',
    category: 'producthunt',
    width: 240,
    height: 240,
    theme: 'emerald',
    headline: '#1 Product of the Day',
    subtitle: 'Voted top developer design tool',
    badge: 'WINNER'
  }
];

router.get('/', (req: Request, res: Response) => {
  const { category } = req.query;
  if (category && typeof category === 'string') {
    return res.json(SEED_TEMPLATES.filter(t => t.category === category));
  }
  res.json(SEED_TEMPLATES);
});

export default router;
