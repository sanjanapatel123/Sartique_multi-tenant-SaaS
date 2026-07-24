import type { BusinessType } from "@prisma/client";

export interface RegisterDto {
  name: string;
  email: string;
  password: string;

  organizationName: string;
  businessType: BusinessType;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface JwtPayload {
  id: string;
  role: string;
  organizationId: string;
}
