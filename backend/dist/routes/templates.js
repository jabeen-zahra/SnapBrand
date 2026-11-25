"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEED_TEMPLATES = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.SEED_TEMPLATES = [
    {
        id: "gh-devops-01",
        title: "DevOps Multi-AZ Master",
        category: "github",
        width: 1280,
        height: 640,
        theme: "cyber",
        headline: "High Availability Multi-AZ Cloud",
        subtitle: "Zero-downtime ASG cluster with 12-Stage DevSecOps Pipeline",
        badge: "AWS CLOUD",
    },
    {
        id: "og-saas-02",
        title: "Silicon Valley SaaS Launch",
        category: "opengraph",
        width: 1200,
        height: 630,
        theme: "sunset",
        headline: "SnapBrand v2.4 Release",
        subtitle: "Generate studio-grade vector assets and dynamic edge OpenGraph cards",
        badge: "NEW LAUNCH",
    },
    {
        id: "tw-minimal-03",
        title: "Obsidian Minimalist Header",
        category: "twitter",
        width: 1500,
        height: 500,
        theme: "obsidian",
        headline: "Engineering at Terminal Speed",
        subtitle: "TypeScript, Kubernetes, Terraform & Distributed Systems",
        badge: "DEV CREW",
    },
    {
        id: "ph-badge-04",
        title: "Product Hunt Featured Badge",
        category: "producthunt",
        width: 240,
        height: 240,
        theme: "emerald",
        headline: "#1 Product of the Day",
        subtitle: "Voted top developer design tool",
        badge: "WINNER",
    },
];
router.get("/categories", (req, res) => {
    const categories = Array.from(new Set(exports.SEED_TEMPLATES.map((t) => t.category)));
    res.json({ success: true, count: categories.length, categories });
});
router.get("/", (req, res) => {
    const { category } = req.query;
    if (category && typeof category === "string") {
        return res.json(exports.SEED_TEMPLATES.filter((t) => t.category === category));
    }
    res.json(exports.SEED_TEMPLATES);
});
exports.default = router;
