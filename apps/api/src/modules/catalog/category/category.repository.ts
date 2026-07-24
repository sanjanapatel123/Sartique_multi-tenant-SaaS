import prisma from "../../../lib/prisma.js";
import type { CreateCategoryDto, UpdateCategoryDto } from "./category.types.js";

class CategoryRepository {
  async findBySlug(slug: string, organizationId: string) {
    return prisma.productCategory.findUnique({
      where: {
        organizationId_slug: {
          organizationId,
          slug,
        },
      },
    });
  }

  async create(data: CreateCategoryDto, slug: string, organizationId: string) {
    return prisma.productCategory.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
        organizationId,
      },
    });
  }
  async findAll(organizationId: string) {
    return prisma.productCategory.findMany({
      where: {
        organizationId,
      },
      orderBy: {
        name: "asc",
      },
    });
  }

  async findById(id: string, organizationId: string) {
    return prisma.productCategory.findFirst({
      where: {
        id,
        organizationId,
      },
    });
  }

  async update(id: string, data: UpdateCategoryDto, slug?: string) {
    return prisma.productCategory.update({
      where: {
        id,
      },
      data: {
        ...data,
        ...(slug && { slug }),
      },
    });
  }

  async deactivate(id: string) {
    return prisma.productCategory.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }
}

export default new CategoryRepository();
