import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { db, UserRecord } from "../db";
import { generateToken, requireAuth } from "../middleware/auth";

const router = Router();

// POST /api/v1/auth/signup - Real user account registration
router.post("/signup", async (req: Request, res: Response) => {
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

    const existingUser = db.findUserByEmail(email);
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "An account with this email address already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser: UserRecord = {
      id: `usr_${Date.now()}`,
      email: email.trim().toLowerCase(),
      passwordHash,
      fullName: fullName.trim(),
      plan: "Pro Creator",
      themePreference: "dark",
      avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(fullName)}`,
      createdAt: new Date().toISOString(),
    };

    db.createUser(newUser);

    const token = generateToken(newUser);

    const { passwordHash: _, ...safeUser } = newUser;
    return res.status(201).json({
      message: "Account successfully registered.",
      token,
      user: safeUser,
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error during registration." });
  }
});

// POST /api/v1/auth/signin - Authenticate user credentials
router.post("/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide both email and password." });
    }

    const user = db.findUserByEmail(email);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid email address or password." });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "Invalid email address or password." });
    }

    const token = generateToken(user);
    const { passwordHash: _, ...safeUser } = user;

    return res.status(200).json({
      message: "Authentication successful.",
      token,
      user: safeUser,
    });
  } catch (error: any) {
    console.error("Signin error:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error during signin." });
  }
});

// GET /api/v1/auth/me - Protected session check
router.get("/me", requireAuth, (req: Request, res: Response) => {
  const user = db.findUserById(req.user!.id);
  if (!user) {
    return res.status(404).json({ error: "User profile not found." });
  }

  const { passwordHash: _, ...safeUser } = user;
  return res.status(200).json({ user: safeUser });
});

// PUT /api/v1/auth/profile - Update user profile & theme preference
router.put("/profile", requireAuth, (req: Request, res: Response) => {
  const { fullName, avatar, themePreference } = req.body;
  const updated = db.updateUser(req.user!.id, {
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

export default router;
