import { Prisma, OrderStatus } from "@prisma/client";
import prisma from "../../lib/prisma.js";
import type { CreateOrderDto, UpdateOrderDto } from "./order.types.js";

const orderSelect = {
  id: true,
  orderNumber: true,
  title: true,
  description: true,
  totalAmount: true,
  status: true,
  createdAt: true,
  updatedAt: true,

  customer: {
    select: {
      id: true,
      name: true,
      phone: true,
    },
  },

  createdBy: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
} satisfies Prisma.OrderSelect;

class OrderRepository {
  async create(
    data: CreateOrderDto,
    organizationId: string,
    createdById: string,
  ) {
    const lastOrder = await prisma.order.findFirst({
      where: { organizationId },
      orderBy: { createdAt: "desc" },
      select: {
        orderNumber: true,
      },
    });

    const lastNumber = lastOrder?.orderNumber
      ? Number(lastOrder.orderNumber.split("-")[1])
      : 0;

    const orderNumber = `ORD-${String(lastNumber + 1).padStart(5, "0")}`;

    return prisma.order.create({
      data: {
        orderNumber,
        title: data.title,
        description: data.description,
        totalAmount: new Prisma.Decimal(data.totalAmount),
        customerId: data.customerId,
        organizationId,
        createdById,
      },
      select: orderSelect,
    });
  }

  async findAll(
    organizationId: string,
    page: number,
    limit: number,
    search?: string,
    status?: OrderStatus,
  ) {
    const where: Prisma.OrderWhereInput = {
      organizationId,

      ...(status && { status }),

      ...(search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            orderNumber: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            customer: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        ],
      }),
    };

    const [orders, total] = await prisma.$transaction([
      prisma.order.findMany({
        where,
        select: orderSelect,
        orderBy: {
          createdAt: "desc",
        },
        skip: (page - 1) * limit,
        take: limit,
      }),

      prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string, organizationId: string) {
    return prisma.order.findFirst({
      where: {
        id,
        organizationId,
      },
      select: {
        ...orderSelect,
        organization: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async update(id: string, organizationId: string, data: UpdateOrderDto) {
    const updateData: Prisma.OrderUpdateInput = {
      ...data,
    };

    if (data.totalAmount !== undefined) {
      updateData.totalAmount = new Prisma.Decimal(data.totalAmount);
    }

    await prisma.order.updateMany({
      where: {
        id,
        organizationId,
      },
      data: updateData,
    });

    return this.findById(id, organizationId);
  }

  async delete(id: string, organizationId: string) {
    await prisma.order.updateMany({
      where: {
        id,
        organizationId,
      },
      data: {
        status: OrderStatus.CANCELLED,
      },
    });

    return this.findById(id, organizationId);
  }
}

export default new OrderRepository();
