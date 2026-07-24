import jwt from "jsonwebtoken";
import type { JwtPayload } from "../modules/auth/auth.types.js";

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("JWT_SECRET is missing. Please check your .env file.");
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, SECRET) as JwtPayload;
}
