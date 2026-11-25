"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const DATA_DIR = path_1.default.resolve(__dirname, "../../data");
const DB_FILE = path_1.default.join(DATA_DIR, "snapbrand.db.json");
class Database {
    data;
    constructor() {
        if (!fs_1.default.existsSync(DATA_DIR)) {
            fs_1.default.mkdirSync(DATA_DIR, { recursive: true });
        }
        if (fs_1.default.existsSync(DB_FILE)) {
            try {
                const raw = fs_1.default.readFileSync(DB_FILE, "utf-8");
                this.data = JSON.parse(raw);
            }
            catch {
                this.data = this.getSeedData();
                this.save();
            }
        }
        else {
            this.data = this.getSeedData();
            this.save();
        }
    }
    getSeedData() {
        // Default demo user: password is "password123"
        // $2a$10$wN1Qe3R1v4L8A3D5f7Z8uOXwP7uU1zJzK1x9oXzJ9pQ1w2e3r4t5y (hashed)
        return {
            users: [
                {
                    id: "usr_demo_creator",
                    email: "creator@snapbrand.io",
                    passwordHash: bcryptjs_1.default.hashSync("password123", 10),
                    fullName: "Elena Rostova",
                    plan: "Pro Creator",
                    themePreference: "dark",
                    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
                    createdAt: new Date().toISOString(),
                },
            ],
            projects: [
                {
                    id: "proj_01",
                    userId: "usr_demo_creator",
                    name: "Cyberpunk Brand Launch Banner",
                    width: 1200,
                    height: 630,
                    theme: "cyber",
                    headline: "Next-Generation Design Tool",
                    subtitle: "Craft high-converting visuals and dynamic vectors in seconds",
                    badgeText: "FEATURED LAUNCH",
                    createdAt: new Date(Date.now() - 3600000).toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                {
                    id: "proj_02",
                    userId: "usr_demo_creator",
                    name: "Retro Sunset Typography Card",
                    width: 1280,
                    height: 640,
                    theme: "sunset",
                    headline: "Craftsmanship Meets Velocity",
                    subtitle: "Vector typography, curved paths, and generative mesh gradients",
                    badgeText: "RETRO EDITION",
                    createdAt: new Date(Date.now() - 7200000).toISOString(),
                    updatedAt: new Date(Date.now() - 3600000).toISOString(),
                },
            ],
            brandKits: [
                {
                    id: "kit_01",
                    userId: "usr_demo_creator",
                    companyName: "SnapBrand Studio",
                    tagline: "Precision Graphics for Modern Creators",
                    palette: {
                        primary: "#00F2FE",
                        secondary: "#6366F1",
                        accent: "#FF7A18",
                        surface: "#0A0D14",
                        panel: "#111625",
                    },
                    typography: {
                        headingFont: "Plus Jakarta Sans",
                        bodyFont: "Inter",
                        codeFont: "JetBrains Mono",
                    },
                    badges: ["Vector Master", "4K Retina", "Curved Type", "Mesh Shader"],
                },
            ],
        };
    }
    save() {
        const tempFile = `${DB_FILE}.tmp`;
        fs_1.default.writeFileSync(tempFile, JSON.stringify(this.data, null, 2), "utf-8");
        fs_1.default.renameSync(tempFile, DB_FILE);
    }
    // Users API
    findUserByEmail(email) {
        return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    }
    findUserById(id) {
        return this.data.users.find((u) => u.id === id);
    }
    createUser(user) {
        this.data.users.push(user);
        this.save();
        return user;
    }
    updateUser(id, updates) {
        const idx = this.data.users.findIndex((u) => u.id === id);
        if (idx === -1)
            return undefined;
        this.data.users[idx] = { ...this.data.users[idx], ...updates };
        this.save();
        return this.data.users[idx];
    }
    // Projects API
    getProjectsByUserId(userId) {
        return this.data.projects.filter((p) => p.userId === userId);
    }
    getProjectById(id) {
        return this.data.projects.find((p) => p.id === id);
    }
    createProject(project) {
        this.data.projects.unshift(project);
        this.save();
        return project;
    }
    updateProject(id, userId, updates) {
        const idx = this.data.projects.findIndex((p) => p.id === id && p.userId === userId);
        if (idx === -1)
            return undefined;
        this.data.projects[idx] = {
            ...this.data.projects[idx],
            ...updates,
            updatedAt: new Date().toISOString(),
        };
        this.save();
        return this.data.projects[idx];
    }
    deleteProject(id, userId) {
        const prevLen = this.data.projects.length;
        this.data.projects = this.data.projects.filter((p) => !(p.id === id && p.userId === userId));
        if (this.data.projects.length !== prevLen) {
            this.save();
            return true;
        }
        return false;
    }
    // BrandKit API
    getBrandKit(userId) {
        return (this.data.brandKits.find((b) => b.userId === userId) ||
            this.data.brandKits[0]);
    }
    saveBrandKit(kit) {
        const idx = this.data.brandKits.findIndex((b) => b.userId === kit.userId);
        if (idx >= 0) {
            this.data.brandKits[idx] = kit;
        }
        else {
            this.data.brandKits.push(kit);
        }
        this.save();
        return kit;
    }
}
exports.db = new Database();
