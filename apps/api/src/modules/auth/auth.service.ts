import type { BusinessType, Feature } from "@prisma/client";

import authRepository from "./auth.repository.js";

import { comparePassword, hashPassword } from "../../lib/password.js";
import { generateToken } from "../../lib/jwt.js";

import type { LoginDto, RegisterDto } from "./auth.types.js";

const defaultFeatures: Record<BusinessType, Feature[]> = {
  FASHION: [
    "CUSTOMERS",
    "ORDERS",
    "INVENTORY",
    "PRODUCTS",
    "MEASUREMENTS",
    "PRODUCTION",
    "TASKS",
    "EMPLOYEES",
    "VENDORS",
    "PURCHASES",
    "POS",
    "PAYMENTS",
    "INVOICES",
    "REPORTS",
  ],

  JEWELRY: [
    "CUSTOMERS",
    "ORDERS",
    "INVENTORY",
    "PRODUCTS",
    "EMPLOYEES",
    "VENDORS",
    "PURCHASES",
    "POS",
    "PAYMENTS",
    "INVOICES",
    "REPORTS",
  ],

  TAILORING: [
    "CUSTOMERS",
    "ORDERS",
    "INVENTORY",
    "PRODUCTS",
    "MEASUREMENTS",
    "PRODUCTION",
    "TASKS",
    "EMPLOYEES",
    "VENDORS",
    "PURCHASES",
    "POS",
    "PAYMENTS",
    "INVOICES",
    "REPORTS",
  ],

  ACCESSORIES: [
    "CUSTOMERS",
    "ORDERS",
    "INVENTORY",
    "PRODUCTS",
    "EMPLOYEES",
    "VENDORS",
    "PURCHASES",
    "POS",
    "PAYMENTS",
    "INVOICES",
    "REPORTS",
  ],

  OTHER: [
    "CUSTOMERS",
    "ORDERS",
    "INVENTORY",
    "PRODUCTS",
    "PAYMENTS",
    "INVOICES",
    "REPORTS",
  ],
};

class AuthService {
  async register(data: RegisterDto) {
    const existingUser = await authRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const slug = data.organizationName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const existingOrganization =
      await authRepository.findOrganizationBySlug(slug);

    if (existingOrganization) {
      throw new Error("Organization name already exists");
    }

    const hashedPassword = await hashPassword(data.password);

    const features = defaultFeatures[data.businessType];

    const { organization, user } = await authRepository.createOrganization(
      data,
      slug,
      features,
      hashedPassword,
    );

    const token = generateToken({
      id: user.id,
      role: user.role,
      organizationId: organization.id,
    });

    return {
      user,
      organization,
      token,
    };
  }

  async login(data: LoginDto) {
    const user = await authRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordMatched = await comparePassword(data.password, user.password);

    if (!passwordMatched) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken({
      id: user.id,
      role: user.role,
      organizationId: user.organizationId,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId,
      },
      token,
    };
  }

  async me(id: string) {
    const user = await authRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

export default new AuthService();
