import { Router, Request, Response } from 'express';

const router = Router();

interface Project {
  id: string;
  name: string;
  width: number;
  height: number;
  theme: string;
  headline: string;
  subtitle: string;
  badge: string;
  updatedAt: string;
  tags: string[];
}

let userProjects: Project[] = [
  {
    id: 'proj-001',
    name: 'DevOps Final Showcase Banner',
    width: 1280,
    height: 640,
    theme: 'cyber',
    headline: 'SnapBrand Cloud Infrastructure',
    subtitle: 'Docker, ASG, ALB, CloudWatch and Trivy',
    badge: 'DEVSECOPS',
    updatedAt: new Date().toISOString(),
    tags: ['devops', 'aws', 'showcase']
  },
  {
    id: 'proj-002',
    name: 'GitHub OpenGraph Card',
    width: 1200,
    height: 630,
    theme: 'sunset',
    headline: 'Zero-Trust Pipeline Demo',
    subtitle: 'Multi-stage builds and automated rollbacks',
    badge: 'PRODUCTION',
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    tags: ['github', 'branding']
  }
];

router.get('/', (req: Request, res: Response) => {
  res.json(userProjects);
});

router.post('/', (req: Request, res: Response) => {
  const { name, width, height, theme, headline, subtitle, badge, tags } = req.body;
  const newProject: Project = {
    id: `proj-${Date.now()}`,
    name: name || 'Untitled Project',
    width: width || 1200,
    height: height || 630,
    theme: theme || 'cyber',
    headline: headline || 'My Project Title',
    subtitle: subtitle || 'Project description goes here',
    badge: badge || 'DEV',
    updatedAt: new Date().toISOString(),
    tags: tags || ['custom']
  };
  userProjects.unshift(newProject);
  res.status(201).json(newProject);
});

router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  userProjects = userProjects.filter(p => p.id !== id);
  res.json({ success: true, deletedId: id });
});

export default router;
