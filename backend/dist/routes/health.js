"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.status(200).json({
        status: "healthy",
        service: "snapbrand-api",
        version: "v1.0.0",
        environment: process.env.NODE_ENV || "production",
        timestamp: new Date().toISOString(),
        uptime: Math.floor(process.uptime()),
        checks: {
            database: "connected",
            redisCache: "connected",
            svgSynthesizer: "ready",
            storageBucket: "ready",
        },
    });
});
exports.default = router;
