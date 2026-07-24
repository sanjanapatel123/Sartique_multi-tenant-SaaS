import prisma from "../../lib/prisma.js";

import type { RegisterDto } from "./auth.types.js";
import type { Feature } from "@prisma/client";

class AuthRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findOrganizationBySlug(slug: string) {
    return prisma.organization.findUnique({
      where: {
        slug,
      },
    });
  }

  async createOrganization(
    data: RegisterDto,
    slug: string,
    features: Feature[],
    hashedPassword: string,
  ) {
    return prisma.$transaction(async (tx) => {
      const organization = await tx.organization.create({
        data: {
          name: data.organizationName,
          slug,
          businessType: data.businessType,

          features: {
            create: features.map((feature) => ({
              feature,
              enabled: true,
            })),
          },
        },
      });

      const user = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          role: "ADMIN",
          organizationId: organization.id,
        },

        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          organizationId: true,
          createdAt: true,
        },
      });

      return {
        organization,
        user,
      };
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        organizationId: true,
        createdAt: true,

        organization: {
          include: {
            features: true,
          },
        },
      },
    });
  }
}

export default new AuthRepository();
