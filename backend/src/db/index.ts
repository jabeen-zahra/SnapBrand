import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  plan: 'Starter' | 'Pro Creator' | 'Team Studio';
  themePreference: 'dark' | 'light';
  avatar: string;
  createdAt: string;
}

export interface ProjectRecord {
  id: string;
  userId: string;
  name: string;
  width: number;
  height: number;
  theme: string;
  headline: string;
  subtitle: string;
  badgeText: string;
  canvasData?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface BrandKitRecord {
  id: string;
  userId: string;
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

interface DatabaseSchema {
  users: UserRecord[];
  projects: ProjectRecord[];
  brandKits: BrandKitRecord[];
}

const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'snapbrand.db.json');

class Database {
  private data: DatabaseSchema;

  constructor() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
      } catch {
        this.data = this.getSeedData();
        this.save();
      }
    } else {
      this.data = this.getSeedData();
      this.save();
    }
  }

  private getSeedData(): DatabaseSchema {
    // Default demo user: password is "password123"
    // $2a$10$wN1Qe3R1v4L8A3D5f7Z8uOXwP7uU1zJzK1x9oXzJ9pQ1w2e3r4t5y (hashed)
    return {
      users: [
        {
          id: 'usr_demo_creator',
          email: 'creator@snapbrand.io',
          passwordHash: bcrypt.hashSync('password123', 10),
          fullName: 'Elena Rostova',
          plan: 'Pro Creator',
          themePreference: 'dark',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
          createdAt: new Date().toISOString()
        }
      ],
      projects: [
        {
          id: 'proj_01',
          userId: 'usr_demo_creator',
          name: 'Cyberpunk Brand Launch Banner',
          width: 1200,
          height: 630,
          theme: 'cyber',
          headline: 'Next-Generation Design Tool',
          subtitle: 'Craft high-converting visuals and dynamic vectors in seconds',
          badgeText: 'FEATURED LAUNCH',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 'proj_02',
          userId: 'usr_demo_creator',
          name: 'Retro Sunset Typography Card',
          width: 1280,
          height: 640,
          theme: 'sunset',
          headline: 'Craftsmanship Meets Velocity',
          subtitle: 'Vector typography, curved paths, and generative mesh gradients',
          badgeText: 'RETRO EDITION',
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          updatedAt: new Date(Date.now() - 3600000).toISOString()
        }
      ],
      brandKits: [
        {
          id: 'kit_01',
          userId: 'usr_demo_creator',
          companyName: 'SnapBrand Studio',
          tagline: 'Precision Graphics for Modern Creators',
          palette: {
            primary: '#00F2FE',
            secondary: '#6366F1',
            accent: '#FF7A18',
            surface: '#0A0D14',
            panel: '#111625'
          },
          typography: {
            headingFont: 'Plus Jakarta Sans',
            bodyFont: 'Inter',
            codeFont: 'JetBrains Mono'
          },
          badges: ['Vector Master', '4K Retina', 'Curved Type', 'Mesh Shader']
        }
      ]
    };
  }

  private save(): void {
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(this.data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  }

  // Users API
  public findUserByEmail(email: string): UserRecord | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public findUserById(id: string): UserRecord | undefined {
    return this.data.users.find(u => u.id === id);
  }

  public createUser(user: UserRecord): UserRecord {
    this.data.users.push(user);
    this.save();
    return user;
  }

  public updateUser(id: string, updates: Partial<UserRecord>): UserRecord | undefined {
    const idx = this.data.users.findIndex(u => u.id === id);
    if (idx === -1) return undefined;
    this.data.users[idx] = { ...this.data.users[idx], ...updates };
    this.save();
    return this.data.users[idx];
  }

  // Projects API
  public getProjectsByUserId(userId: string): ProjectRecord[] {
    return this.data.projects.filter(p => p.userId === userId);
  }

  public getProjectById(id: string): ProjectRecord | undefined {
    return this.data.projects.find(p => p.id === id);
  }

  public createProject(project: ProjectRecord): ProjectRecord {
    this.data.projects.unshift(project);
    this.save();
    return project;
  }

  public updateProject(id: string, userId: string, updates: Partial<ProjectRecord>): ProjectRecord | undefined {
    const idx = this.data.projects.findIndex(p => p.id === id && p.userId === userId);
    if (idx === -1) return undefined;
    this.data.projects[idx] = { ...this.data.projects[idx], ...updates, updatedAt: new Date().toISOString() };
    this.save();
    return this.data.projects[idx];
  }

  public deleteProject(id: string, userId: string): boolean {
    const prevLen = this.data.projects.length;
    this.data.projects = this.data.projects.filter(p => !(p.id === id && p.userId === userId));
    if (this.data.projects.length !== prevLen) {
      this.save();
      return true;
    }
    return false;
  }

  // BrandKit API
  public getBrandKit(userId: string): BrandKitRecord | undefined {
    return this.data.brandKits.find(b => b.userId === userId) || this.data.brandKits[0];
  }

  public saveBrandKit(kit: BrandKitRecord): BrandKitRecord {
    const idx = this.data.brandKits.findIndex(b => b.userId === kit.userId);
    if (idx >= 0) {
      this.data.brandKits[idx] = kit;
    } else {
      this.data.brandKits.push(kit);
    }
    this.save();
    return kit;
  }
}

export const db = new Database();
