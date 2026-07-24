import prisma from "../../../lib/prisma.js";
import type { CreateAttributeDto } from "./attribute.types.js";

class AttributeRepository {
  async findByKey(key: string, organizationId: string) {
    return prisma.attributeDefinition.findUnique({
      where: {
        organizationId_key: {
          organizationId,
          key,
        },
      },
    });
  }

  async create(data: CreateAttributeDto, organizationId: string) {
    return prisma.attributeDefinition.create({
      data: {
        name: data.name,
        key: data.key,
        type: data.type,
        required: data.required ?? false,

        options: data.type === "SELECT" ? data.options : undefined,

        organizationId,
      },
    });
  }

  async findAll(organizationId: string) {
    return prisma.attributeDefinition.findMany({
      where: {
        organizationId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }
}

export default new AttributeRepository();
