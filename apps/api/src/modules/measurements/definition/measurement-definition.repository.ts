import prisma from "../../../lib/prisma.js";

class MeasurementDefinitionRepository {
  create(data: {
    name: string;
    key: string;
    unit: "INCH" | "CM";
    description?: string;
    organizationId: string;
  }) {
    return prisma.measurementDefinition.create({
      data,
    });
  }

  findAll(organizationId: string) {
    return prisma.measurementDefinition.findMany({
      where: {
        organizationId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  findById(id: string, organizationId: string) {
    return prisma.measurementDefinition.findFirst({
      where: {
        id,
        organizationId,
      },
    });
  }

  findByKey(key: string, organizationId: string) {
    return prisma.measurementDefinition.findFirst({
      where: {
        key,
        organizationId,
      },
    });
  }

  update(
    id: string,
    organizationId: string,
    data: {
      name?: string;
      unit?: "INCH" | "CM";
      description?: string | null;
      isActive?: boolean;
    },
  ) {
    return prisma.measurementDefinition.update({
      where: {
        id,
        organizationId,
      },
      data,
    });
  }

  deactivate(id: string, organizationId: string) {
    return prisma.measurementDefinition.update({
      where: {
        id,
        organizationId,
      },
      data: {
        isActive: false,
      },
    });
  }
}

export default new MeasurementDefinitionRepository();
