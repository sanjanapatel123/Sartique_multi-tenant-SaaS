import prisma from "../../lib/prisma.js";

import type { CreateCustomerDto, UpdateCustomerDto } from "./customer.types.js";

class CustomerRepository {
  async create(data: CreateCustomerDto, organizationId: string) {
    return prisma.customer.create({
      data: {
        ...data,
        organizationId,
      },
    });
  }

  async findAll(organizationId: string) {
    return prisma.customer.findMany({
      where: {
        organizationId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        orders: true,
      },
    });
  }

  async findById(id: string, organizationId: string) {
    return prisma.customer.findFirst({
      where: {
        id,
        organizationId,
      },
      include: {
        orders: true,
      },
    });
  }

  async findByPhone(phone: string, organizationId: string) {
    return prisma.customer.findFirst({
      where: {
        phone,
        organizationId,
      },
    });
  }

  async update(id: string, organizationId: string, data: UpdateCustomerDto) {
    return prisma.customer.update({
      where: {
        id,
        organizationId,
      },
      data,
    });
  }

  async delete(id: string, organizationId: string) {
    return prisma.customer.delete({
      where: {
        id,
        organizationId,
      },
    });
  }
}

export default new CustomerRepository();
