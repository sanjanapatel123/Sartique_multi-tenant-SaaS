import prisma from "../../../lib/prisma.js";
import type { CreateTemplateDto, UpdateTemplateDto } from "./template.types.js";

class TemplateRepository {
  async findByName(name: string, organizationId: string) {
    return prisma.measurementTemplate.findFirst({
      where: {
        name,
        organizationId,
      },
    });
  }

  async findDefinitions(ids: string[], organizationId: string) {
    return prisma.measurementDefinition.findMany({
      where: {
        id: {
          in: ids,
        },
        organizationId,
        isActive: true,
      },
    });
  }

  async create(data: CreateTemplateDto, organizationId: string) {
    return prisma.measurementTemplate.create({
      data: {
        name: data.name,
        description: data.description,
        organizationId,

        fields: {
          create: data.fields.map((field) => ({
            measurementDefinitionId: field.measurementDefinitionId,
            required: field.required ?? true,
            sortOrder: field.sortOrder ?? 0,
          })),
        },
      },

      include: {
        fields: {
          orderBy: {
            sortOrder: "asc",
          },

          include: {
            measurementDefinition: true,
          },
        },
      },
    });
  }

  async findAll(organizationId: string) {
    return prisma.measurementTemplate.findMany({
      where: {
        organizationId,
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        fields: {
          orderBy: {
            sortOrder: "asc",
          },

          include: {
            measurementDefinition: {
              select: {
                id: true,
                name: true,
                key: true,
                unit: true,
                isActive: true,
              },
            },
          },
        },
      },
    });
  }

  async findById(id: string, organizationId: string) {
    return prisma.measurementTemplate.findFirst({
      where: {
        id,
        organizationId,
      },

      include: {
        fields: {
          orderBy: {
            sortOrder: "asc",
          },

          include: {
            measurementDefinition: true,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateTemplateDto) {
    return prisma.$transaction(async (tx) => {
      await tx.measurementTemplate.update({
        where: {
          id,
        },

        data: {
          name: data.name,
          description: data.description,
          isActive: data.isActive,
        },
      });

      // Replace fields only when fields are submitted
      if (data.fields) {
        await tx.measurementTemplateField.deleteMany({
          where: {
            templateId: id,
          },
        });

        await tx.measurementTemplateField.createMany({
          data: data.fields.map((field) => ({
            templateId: id,
            measurementDefinitionId: field.measurementDefinitionId,
            required: field.required ?? true,
            sortOrder: field.sortOrder ?? 0,
          })),
        });
      }

      return tx.measurementTemplate.findUnique({
        where: {
          id,
        },

        include: {
          fields: {
            orderBy: {
              sortOrder: "asc",
            },

            include: {
              measurementDefinition: true,
            },
          },
        },
      });
    });
  }

  async deactivate(id: string) {
    return prisma.measurementTemplate.update({
      where: {
        id,
      },

      data: {
        isActive: false,
      },
    });
  }
}

export default new TemplateRepository();
