"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let brandKit = {
    companyName: "SnapBrand Cloud",
    tagline: "Edge Visual Studio & Dynamic OpenGraph Engine",
    palette: {
        primary: "#ff7a18",
        secondary: "#00f2fe",
        accent: "#00e676",
        surface: "#090a0f",
        panel: "#12131c",
    },
    typography: {
        headingFont: "Plus Jakarta Sans",
        bodyFont: "Inter",
        codeFont: "JetBrains Mono",
    },
    badges: [
        "AWS",
        "Docker",
        "React 19",
        "TypeScript",
        "DevSecOps",
        "PostgreSQL",
        "Redis",
    ],
};
router.get("/", (req, res) => {
    res.json(brandKit);
});
router.put("/", (req, res) => {
    brandKit = { ...brandKit, ...req.body };
    res.json({ success: true, brandKit });
});
exports.default = router;
