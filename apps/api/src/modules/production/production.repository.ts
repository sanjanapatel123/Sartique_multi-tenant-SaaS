import prisma from "../../lib/prisma.js";

import type {
  CreateProductionJobDto,
  ProductionQueryDto,
  UpdateProductionJobDto,
} from "./production.types.js";

class ProductionRepository {
  async findByJobNumber(jobNumber: string, organizationId: string) {
    return prisma.productionJob.findUnique({
      where: {
        organizationId_jobNumber: {
          organizationId,
          jobNumber,
        },
      },
    });
  }

  async findOrder(orderId: string, organizationId: string) {
    return prisma.order.findFirst({
      where: {
        id: orderId,
        organizationId,
      },
    });
  }

  async findEmployee(employeeId: string, organizationId: string) {
    return prisma.employee.findFirst({
      where: {
        id: employeeId,
        organizationId,
        isActive: true,
      },
    });
  }

  async create(data: CreateProductionJobDto, organizationId: string) {
    return prisma.productionJob.create({
      data: {
        jobNumber: data.jobNumber,
        orderId: data.orderId,
        assignedEmployeeId: data.assignedEmployeeId,

        priority: data.priority ?? "NORMAL",

        startDate: data.startDate,
        dueDate: data.dueDate,

        notes: data.notes,

        organizationId,
      },

      include: {
        order: {
          select: {
            id: true,
            orderNumber: true,
            title: true,
            status: true,
          },
        },

        assignedEmployee: {
          select: {
            id: true,
            employeeCode: true,
            name: true,
            designation: true,
            department: true,
          },
        },
      },
    });
  }

  async findAll(organizationId: string, query: ProductionQueryDto) {
    const {
      page,
      limit,
      search,
      status,
      priority,
      assignedEmployeeId,
      orderId,
    } = query;

    const skip = (page - 1) * limit;

    const where = {
      organizationId,

      ...(status && {
        status,
      }),

      ...(priority && {
        priority,
      }),

      ...(assignedEmployeeId && {
        assignedEmployeeId,
      }),

      ...(orderId && {
        orderId,
      }),

      ...(search && {
        OR: [
          {
            jobNumber: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            order: {
              orderNumber: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          },
          {
            order: {
              title: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          },
        ],
      }),
    };

    const [jobs, total] = await prisma.$transaction([
      prisma.productionJob.findMany({
        where,

        skip,
        take: limit,

        orderBy: {
          createdAt: "desc",
        },

        include: {
          order: {
            select: {
              id: true,
              orderNumber: true,
              title: true,
              status: true,
            },
          },

          assignedEmployee: {
            select: {
              id: true,
              employeeCode: true,
              name: true,
              designation: true,
            },
          },
        },
      }),

      prisma.productionJob.count({
        where,
      }),
    ]);

    return {
      jobs,
      total,
    };
  }

  async findById(id: string, organizationId: string) {
    return prisma.productionJob.findFirst({
      where: {
        id,
        organizationId,
      },

      include: {
        order: {
          select: {
            id: true,
            orderNumber: true,
            title: true,
            status: true,

            customer: {
              select: {
                id: true,
                name: true,
                phone: true,
              },
            },
          },
        },

        assignedEmployee: {
          select: {
            id: true,
            employeeCode: true,
            name: true,
            designation: true,
            department: true,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateProductionJobDto) {
    return prisma.productionJob.update({
      where: {
        id,
      },

      data: {
        assignedEmployeeId: data.assignedEmployeeId,

        status: data.status,
        priority: data.priority,

        startDate: data.startDate,
        dueDate: data.dueDate,

        notes: data.notes,

        ...(data.status === "COMPLETED" && {
          completedAt: new Date(),
        }),

        ...(data.status &&
          data.status !== "COMPLETED" && {
            completedAt: null,
          }),
      },

      include: {
        order: {
          select: {
            id: true,
            orderNumber: true,
            title: true,
            status: true,
          },
        },

        assignedEmployee: {
          select: {
            id: true,
            employeeCode: true,
            name: true,
            designation: true,
          },
        },
      },
    });
  }
}

export default new ProductionRepository();
