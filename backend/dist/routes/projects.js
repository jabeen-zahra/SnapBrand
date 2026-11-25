"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// GET /api/v1/projects - Fetch projects owned by authenticated user
router.get("/", auth_1.requireAuth, (req, res) => {
    const projects = db_1.db.getProjectsByUserId(req.user.id);
    res.status(200).json(projects);
});
// POST /api/v1/projects - Create a new brand project
router.post("/", auth_1.requireAuth, (req, res) => {
    const { name, width, height, theme, headline, subtitle, badgeText, canvasData, } = req.body;
    const newProject = db_1.db.createProject({
        id: `proj_${Date.now()}`,
        userId: req.user.id,
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
router.put("/:id", auth_1.requireAuth, (req, res) => {
    const { id } = req.params;
    const updated = db_1.db.updateProject(id, req.user.id, req.body);
    if (!updated) {
        return res
            .status(404)
            .json({ error: "Project not found or unauthorized." });
    }
    res.status(200).json(updated);
});
// DELETE /api/v1/projects/:id - Remove project
router.delete("/:id", auth_1.requireAuth, (req, res) => {
    const { id } = req.params;
    const deleted = db_1.db.deleteProject(id, req.user.id);
    if (!deleted) {
        return res
            .status(404)
            .json({ error: "Project not found or unauthorized." });
    }
    res.status(200).json({ success: true, deletedId: id });
});
exports.default = router;
