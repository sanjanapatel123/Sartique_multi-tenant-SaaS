import prisma from "../../lib/prisma.js";

import type {
  CreateTaskDto,
  TaskQueryDto,
  UpdateTaskDto,
} from "./task.types.js";

class TaskRepository {
  async findProductionJob(productionJobId: string, organizationId: string) {
    return prisma.productionJob.findFirst({
      where: {
        id: productionJobId,
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

  async create(data: CreateTaskDto, organizationId: string) {
    return prisma.task.create({
      data: {
        title: data.title,
        description: data.description,

        priority: data.priority ?? "NORMAL",
        dueDate: data.dueDate,

        productionJobId: data.productionJobId,
        assignedEmployeeId: data.assignedEmployeeId,

        organizationId,
      },

      include: {
        productionJob: {
          select: {
            id: true,
            jobNumber: true,
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

  async findAll(organizationId: string, query: TaskQueryDto) {
    const {
      page,
      limit,
      search,
      status,
      priority,
      productionJobId,
      assignedEmployeeId,
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

      ...(productionJobId && {
        productionJobId,
      }),

      ...(assignedEmployeeId && {
        assignedEmployeeId,
      }),

      ...(search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            productionJob: {
              jobNumber: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          },
        ],
      }),
    };

    const [tasks, total] = await prisma.$transaction([
      prisma.task.findMany({
        where,

        skip,
        take: limit,

        orderBy: {
          createdAt: "desc",
        },

        include: {
          productionJob: {
            select: {
              id: true,
              jobNumber: true,
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

      prisma.task.count({
        where,
      }),
    ]);

    return {
      tasks,
      total,
    };
  }

  async findById(id: string, organizationId: string) {
    return prisma.task.findFirst({
      where: {
        id,
        organizationId,
      },

      include: {
        productionJob: {
          select: {
            id: true,
            jobNumber: true,
            status: true,

            order: {
              select: {
                id: true,
                orderNumber: true,
                title: true,
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

  async update(id: string, data: UpdateTaskDto) {
    return prisma.task.update({
      where: {
        id,
      },

      data: {
        title: data.title,
        description: data.description,

        status: data.status,
        priority: data.priority,

        dueDate: data.dueDate,

        productionJobId: data.productionJobId,
        assignedEmployeeId: data.assignedEmployeeId,

        ...(data.status === "IN_PROGRESS" && {
          startedAt: new Date(),
        }),

        ...(data.status === "COMPLETED" && {
          completedAt: new Date(),
        }),

        ...(data.status &&
          data.status !== "COMPLETED" && {
            completedAt: null,
          }),
      },

      include: {
        productionJob: {
          select: {
            id: true,
            jobNumber: true,
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

  async cancel(id: string) {
    return prisma.task.update({
      where: {
        id,
      },

      data: {
        status: "CANCELLED",
      },
    });
  }
}

export default new TaskRepository();
