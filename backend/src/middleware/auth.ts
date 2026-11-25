import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function resolveJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET must be provided in production");
  }
  // Non-production fallback only (local dev and unit tests).
  return "dev-only-insecure-secret";
}

const JWT_SECRET = resolveJwtSecret();

export interface AuthenticatedUser {
  id: string;
  email: string;
  fullName: string;
  plan: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ error: "Unauthorized: Missing or invalid authentication token" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AuthenticatedUser;
    req.user = payload;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ error: "Unauthorized: Session expired or invalid signature" });
  }
}

export function generateToken(user: {
  id: string;
  email: string;
  fullName: string;
  plan: string;
}): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      plan: user.plan,
    },
    JWT_SECRET,
    { expiresIn: "7d" },
  );
}
