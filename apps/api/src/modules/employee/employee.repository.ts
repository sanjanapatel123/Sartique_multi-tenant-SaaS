import prisma from "../../lib/prisma.js";

import type {
  CreateEmployeeDto,
  EmployeeQueryDto,
  UpdateEmployeeDto,
} from "./employee.types.js";

class EmployeeRepository {
  async findByCode(employeeCode: string, organizationId: string) {
    return prisma.employee.findUnique({
      where: {
        organizationId_employeeCode: {
          organizationId,
          employeeCode,
        },
      },
    });
  }

  async findByEmail(email: string, organizationId: string) {
    return prisma.employee.findFirst({
      where: {
        organizationId,
        email,
      },
    });
  }

  async findByPhone(phone: string, organizationId: string) {
    return prisma.employee.findFirst({
      where: {
        organizationId,
        phone,
      },
    });
  }

  async create(data: CreateEmployeeDto, organizationId: string) {
    return prisma.employee.create({
      data: {
        employeeCode: data.employeeCode,
        name: data.name,
        email: data.email,
        phone: data.phone,
        designation: data.designation,
        department: data.department,
        joiningDate: data.joiningDate,
        organizationId,
      },
    });
  }

  async findAll(organizationId: string, query: EmployeeQueryDto) {
    const { page, limit, search, department, isActive } = query;

    const skip = (page - 1) * limit;

    const where = {
      organizationId,

      ...(department && {
        department: {
          equals: department,
          mode: "insensitive" as const,
        },
      }),

      ...(isActive !== undefined && {
        isActive,
      }),

      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            employeeCode: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            phone: {
              contains: search,
            },
          },
        ],
      }),
    };

    const [employees, total] = await prisma.$transaction([
      prisma.employee.findMany({
        where,

        skip,
        take: limit,

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.employee.count({
        where,
      }),
    ]);

    return {
      employees,
      total,
    };
  }

  async findById(id: string, organizationId: string) {
    return prisma.employee.findFirst({
      where: {
        id,
        organizationId,
      },
    });
  }

  async update(id: string, data: UpdateEmployeeDto) {
    return prisma.employee.update({
      where: {
        id,
      },

      data: {
        employeeCode: data.employeeCode,
        name: data.name,
        email: data.email,
        phone: data.phone,
        designation: data.designation,
        department: data.department,
        joiningDate: data.joiningDate,
        isActive: data.isActive,
      },
    });
  }

  async deactivate(id: string) {
    return prisma.employee.update({
      where: {
        id,
      },

      data: {
        isActive: false,
      },
    });
  }
}

export default new EmployeeRepository();
