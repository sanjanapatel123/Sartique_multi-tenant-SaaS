import prisma from "../../../lib/prisma.js";

import type { CreateProfileDto, UpdateProfileDto } from "./profile.types.js";

class ProfileRepository {
  async findCustomer(customerId: string, organizationId: string) {
    return prisma.customer.findFirst({
      where: {
        id: customerId,
        organizationId,
      },
    });
  }

  async findTemplate(templateId: string, organizationId: string) {
    return prisma.measurementTemplate.findFirst({
      where: {
        id: templateId,
        organizationId,
        isActive: true,
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

  async create(
    data: CreateProfileDto,
    organizationId: string,
    measurementValues: {
      measurementDefinitionId: string;
      value: number;
    }[],
  ) {
    return prisma.measurementProfile.create({
      data: {
        name: data.name,
        customerId: data.customerId,
        templateId: data.templateId,
        organizationId,

        versions: {
          create: {
            version: 1,
            note: data.note,

            values: {
              create: measurementValues.map((item) => ({
                measurementDefinitionId: item.measurementDefinitionId,
                value: item.value,
              })),
            },
          },
        },
      },

      include: {
        customer: true,
        template: true,

        versions: {
          include: {
            values: {
              include: {
                measurementDefinition: true,
              },
            },
          },
        },
      },
    });
  }

  async findAll(organizationId: string) {
    return prisma.measurementProfile.findMany({
      where: {
        organizationId,
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        customer: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },

        template: {
          select: {
            id: true,
            name: true,
          },
        },

        versions: {
          orderBy: {
            version: "desc",
          },

          take: 1,

          include: {
            values: {
              include: {
                measurementDefinition: {
                  select: {
                    id: true,
                    name: true,
                    key: true,
                    unit: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findById(id: string, organizationId: string) {
    return prisma.measurementProfile.findFirst({
      where: {
        id,
        organizationId,
      },

      include: {
        customer: true,

        template: {
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
        },

        versions: {
          orderBy: {
            version: "desc",
          },

          include: {
            values: {
              include: {
                measurementDefinition: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateProfileDto) {
    return prisma.measurementProfile.update({
      where: {
        id,
      },

      data: {
        name: data.name,
        isActive: data.isActive,
      },
    });
  }

  async deactivate(id: string) {
    return prisma.measurementProfile.update({
      where: {
        id,
      },

      data: {
        isActive: false,
      },
    });
  }

  async findLatestVersion(profileId: string) {
    return prisma.measurementVersion.findFirst({
      where: {
        profileId,
      },

      orderBy: {
        version: "desc",
      },
    });
  }

  async createVersion(
    profileId: string,
    version: number,
    note: string | undefined,
    measurementValues: {
      measurementDefinitionId: string;
      value: number;
    }[],
  ) {
    return prisma.measurementVersion.create({
      data: {
        profileId,
        version,
        note,

        values: {
          create: measurementValues.map((item) => ({
            measurementDefinitionId: item.measurementDefinitionId,
            value: item.value,
          })),
        },
      },

      include: {
        values: {
          include: {
            measurementDefinition: true,
          },
        },
      },
    });
  }
}

export default new ProfileRepository();
