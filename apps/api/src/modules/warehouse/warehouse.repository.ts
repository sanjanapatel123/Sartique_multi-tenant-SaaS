import prisma from "../../lib/prisma.js";
import type {
  CreateWarehouseDto,
  UpdateWarehouseDto,
} from "./warehouse.types.js";

class WarehouseRepository {
  async findByCode(code: string, organizationId: string) {
    return prisma.warehouse.findUnique({
      where: {
        organizationId_code: {
          organizationId,
          code,
        },
      },
    });
  }

  async create(data: CreateWarehouseDto, organizationId: string) {
    return prisma.warehouse.create({
      data: {
        name: data.name,
        code: data.code,
        address: data.address,
        organizationId,
      },
    });
  }

  async findAll(organizationId: string) {
    return prisma.warehouse.findMany({
      where: {
        organizationId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string, organizationId: string) {
    return prisma.warehouse.findFirst({
      where: {
        id,
        organizationId,
      },
    });
  }

  async update(id: string, data: UpdateWarehouseDto) {
    return prisma.warehouse.update({
      where: {
        id,
      },
      data,
    });
  }

  async deactivate(id: string) {
    return prisma.warehouse.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }
}

export default new WarehouseRepository();
