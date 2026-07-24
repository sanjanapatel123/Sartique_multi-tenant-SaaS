import productionRepository from "./production.repository.js";

import type {
  CreateProductionJobDto,
  ProductionQueryDto,
  UpdateProductionJobDto,
} from "./production.types.js";

class ProductionService {
  async create(data: CreateProductionJobDto, organizationId: string) {
    // 1. Duplicate job number
    const existing = await productionRepository.findByJobNumber(
      data.jobNumber,
      organizationId,
    );

    if (existing) {
      throw new Error("Production job number already exists");
    }

    // 2. Order validation
    const order = await productionRepository.findOrder(
      data.orderId,
      organizationId,
    );

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status === "CANCELLED") {
      throw new Error("Cannot create production job for cancelled order");
    }

    // 3. Employee validation
    if (data.assignedEmployeeId) {
      const employee = await productionRepository.findEmployee(
        data.assignedEmployeeId,
        organizationId,
      );

      if (!employee) {
        throw new Error("Assigned employee not found or inactive");
      }
    }

    // 4. Date validation
    if (data.startDate && data.dueDate && data.dueDate < data.startDate) {
      throw new Error("Due date cannot be before start date");
    }

    return productionRepository.create(data, organizationId);
  }

  async findAll(organizationId: string, query: ProductionQueryDto) {
    const { jobs, total } = await productionRepository.findAll(
      organizationId,
      query,
    );

    return {
      jobs,

      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }

  async findById(id: string, organizationId: string) {
    const job = await productionRepository.findById(id, organizationId);

    if (!job) {
      throw new Error("Production job not found");
    }

    return job;
  }

  async update(
    id: string,
    data: UpdateProductionJobDto,
    organizationId: string,
  ) {
    const job = await productionRepository.findById(id, organizationId);

    if (!job) {
      throw new Error("Production job not found");
    }

    // Employee validation
    if (data.assignedEmployeeId) {
      const employee = await productionRepository.findEmployee(
        data.assignedEmployeeId,
        organizationId,
      );

      if (!employee) {
        throw new Error("Assigned employee not found or inactive");
      }
    }

    const startDate =
      data.startDate !== undefined ? data.startDate : job.startDate;

    const dueDate = data.dueDate !== undefined ? data.dueDate : job.dueDate;

    if (startDate && dueDate && dueDate < startDate) {
      throw new Error("Due date cannot be before start date");
    }

    return productionRepository.update(id, data);
  }

  async cancel(id: string, organizationId: string) {
    const job = await productionRepository.findById(id, organizationId);

    if (!job) {
      throw new Error("Production job not found");
    }

    if (job.status === "CANCELLED") {
      throw new Error("Production job is already cancelled");
    }

    if (job.status === "COMPLETED") {
      throw new Error("Completed production job cannot be cancelled");
    }

    return productionRepository.update(id, {
      status: "CANCELLED",
    });
  }
}

export default new ProductionService();
