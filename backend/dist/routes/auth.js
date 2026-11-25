"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../db");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// POST /api/v1/auth/signup - Real user account registration
router.post("/signup", async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        if (!email || !password || !fullName) {
            return res
                .status(400)
                .json({ error: "Please provide full name, email, and password." });
        }
        if (password.length < 6) {
            return res
                .status(400)
                .json({ error: "Password must be at least 6 characters long." });
        }
        const existingUser = db_1.db.findUserByEmail(email);
        if (existingUser) {
            return res
                .status(409)
                .json({ error: "An account with this email address already exists." });
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const passwordHash = await bcryptjs_1.default.hash(password, salt);
        const newUser = {
            id: `usr_${Date.now()}`,
            email: email.trim().toLowerCase(),
            passwordHash,
            fullName: fullName.trim(),
            plan: "Pro Creator",
            themePreference: "dark",
            avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(fullName)}`,
            createdAt: new Date().toISOString(),
        };
        db_1.db.createUser(newUser);
        const token = (0, auth_1.generateToken)(newUser);
        const { passwordHash: _, ...safeUser } = newUser;
        return res.status(201).json({
            message: "Account successfully registered.",
            token,
            user: safeUser,
        });
    }
    catch (error) {
        console.error("Signup error:", error);
        return res
            .status(500)
            .json({ error: "Internal Server Error during registration." });
    }
});
// POST /api/v1/auth/signin - Authenticate user credentials
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ error: "Please provide both email and password." });
        }
        const user = db_1.db.findUserByEmail(email);
        if (!user) {
            return res
                .status(401)
                .json({ error: "Invalid email address or password." });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isMatch) {
            return res
                .status(401)
                .json({ error: "Invalid email address or password." });
        }
        const token = (0, auth_1.generateToken)(user);
        const { passwordHash: _, ...safeUser } = user;
        return res.status(200).json({
            message: "Authentication successful.",
            token,
            user: safeUser,
        });
    }
    catch (error) {
        console.error("Signin error:", error);
        return res
            .status(500)
            .json({ error: "Internal Server Error during signin." });
    }
});
// GET /api/v1/auth/me - Protected session check
router.get("/me", auth_1.requireAuth, (req, res) => {
    const user = db_1.db.findUserById(req.user.id);
    if (!user) {
        return res.status(404).json({ error: "User profile not found." });
    }
    const { passwordHash: _, ...safeUser } = user;
    return res.status(200).json({ user: safeUser });
});
// PUT /api/v1/auth/profile - Update user profile & theme preference
router.put("/profile", auth_1.requireAuth, (req, res) => {
    const { fullName, avatar, themePreference } = req.body;
    const updated = db_1.db.updateUser(req.user.id, {
        ...(fullName ? { fullName: fullName.trim() } : {}),
        ...(avatar ? { avatar } : {}),
        ...(themePreference ? { themePreference } : {}),
    });
    if (!updated) {
        return res.status(404).json({ error: "User not found." });
    }
    const { passwordHash: _, ...safeUser } = updated;
    return res.status(200).json({ user: safeUser });
});
exports.default = router;
