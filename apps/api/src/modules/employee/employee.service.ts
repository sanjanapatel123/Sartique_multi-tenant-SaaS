import employeeRepository from "./employee.repository.js";

import type {
  CreateEmployeeDto,
  EmployeeQueryDto,
  UpdateEmployeeDto,
} from "./employee.types.js";

class EmployeeService {
  async create(data: CreateEmployeeDto, organizationId: string) {
    const [existingCode, existingEmail, existingPhone] = await Promise.all([
      employeeRepository.findByCode(data.employeeCode, organizationId),
      employeeRepository.findByEmail(data.email, organizationId),
      employeeRepository.findByPhone(data.phone, organizationId),
    ]);

    if (existingCode) {
      throw new Error("Employee code already exists");
    }

    if (existingEmail) {
      throw new Error("Employee email already exists");
    }

    if (existingPhone) {
      throw new Error("Employee phone already exists");
    }

    return employeeRepository.create(data, organizationId);
  }

  async findAll(organizationId: string, query: EmployeeQueryDto) {
    const { employees, total } = await employeeRepository.findAll(
      organizationId,
      query,
    );

    return {
      employees,

      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }

  async findById(id: string, organizationId: string) {
    const employee = await employeeRepository.findById(id, organizationId);

    if (!employee) {
      throw new Error("Employee not found");
    }

    return employee;
  }

  async update(id: string, data: UpdateEmployeeDto, organizationId: string) {
    const employee = await employeeRepository.findById(id, organizationId);

    if (!employee) {
      throw new Error("Employee not found");
    }

    if (data.employeeCode && data.employeeCode !== employee.employeeCode) {
      const existing = await employeeRepository.findByCode(
        data.employeeCode,
        organizationId,
      );

      if (existing) {
        throw new Error("Employee code already exists");
      }
    }

    if (data.email && data.email !== employee.email) {
      const existing = await employeeRepository.findByEmail(
        data.email,
        organizationId,
      );

      if (existing) {
        throw new Error("Employee email already exists");
      }
    }

    if (data.phone && data.phone !== employee.phone) {
      const existing = await employeeRepository.findByPhone(
        data.phone,
        organizationId,
      );

      if (existing) {
        throw new Error("Employee phone already exists");
      }
    }

    return employeeRepository.update(id, data);
  }

  async deactivate(id: string, organizationId: string) {
    const employee = await employeeRepository.findById(id, organizationId);

    if (!employee) {
      throw new Error("Employee not found");
    }

    if (!employee.isActive) {
      throw new Error("Employee is already inactive");
    }

    return employeeRepository.deactivate(id);
  }
}

export default new EmployeeService();
