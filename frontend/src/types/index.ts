export type ActiveView = 'dashboard' | 'studio' | 'projects' | 'templates' | 'brandkit' | 'settings';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  avatar: string;
}

export interface Project {
  id: string;
  name: string;
  width: number;
  height: number;
  theme: 'cyber' | 'sunset' | 'obsidian' | 'emerald' | 'minimal';
  headline: string;
  subtitle: string;
  badge: string;
  updatedAt: string;
  tags: string[];
}

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

export interface BrandKit {
  companyName: string;
  tagline: string;
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    surface: string;
    panel: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    codeFont: string;
  };
  badges: string[];
}
