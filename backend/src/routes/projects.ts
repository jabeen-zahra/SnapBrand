import { Router, Request, Response } from "express";
import { db } from "../db";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/v1/projects - Fetch projects owned by authenticated user
router.get("/", requireAuth, (req: Request, res: Response) => {
  const projects = db.getProjectsByUserId(req.user!.id);
  res.status(200).json(projects);
});

// POST /api/v1/projects - Create a new brand project
router.post("/", requireAuth, (req: Request, res: Response) => {
  const {
    name,
    width,
    height,
    theme,
    headline,
    subtitle,
    badgeText,
    canvasData,
  } = req.body;

  const newProject = db.createProject({
    id: `proj_${Date.now()}`,
    userId: req.user!.id,
    name: name || "Untitled Artwork",
    width: width || 1200,
    height: height || 630,
    theme: theme || "cyber",
    headline: headline || "My Project Headline",
    subtitle: subtitle || "Design description and styling details",
    badgeText: badgeText || "BRAND ASSET",
    canvasData: canvasData || {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  res.status(201).json(newProject);
});

// PUT /api/v1/projects/:id - Update existing project
router.put("/:id", requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = db.updateProject(id, req.user!.id, req.body);

  if (!updated) {
    return res
      .status(404)
      .json({ error: "Project not found or unauthorized." });
  }

  res.status(200).json(updated);
});

// DELETE /api/v1/projects/:id - Remove project
router.delete("/:id", requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = db.deleteProject(id, req.user!.id);

  if (!deleted) {
    return res
      .status(404)
      .json({ error: "Project not found or unauthorized." });
  }

  res.status(200).json({ success: true, deletedId: id });
});

export default router;
