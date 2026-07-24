import orderRepository from "./order.respository.js";

import type {
  CreateOrderDto,
  UpdateOrderDto,
  OrderQueryDto,
} from "./order.types.js";

class OrderService {
  // ✅ CREATE (with safety layer)
  async create(data: CreateOrderDto, organizationId: string, userId: string) {
    if (!data.customerId || !data.title) {
      throw new Error("Invalid order data");
    }

    if (data.totalAmount <= 0) {
      throw new Error("Total amount must be greater than 0");
    }

    return orderRepository.create(data, organizationId, userId);
  }

  // ✅ FIND ALL (safe pagination + defaults)
  async findAll(organizationId: string, query: OrderQueryDto) {
    const page = Math.max(1, query.page ?? 1);
    const limit = Math.min(50, Math.max(1, query.limit ?? 10));

    return orderRepository.findAll(
      organizationId,
      page,
      limit,
      query.search?.trim(),
      query.status,
    );
  }

  // ✅ FIND BY ID (guard added)
  async findById(id: string, organizationId: string) {
    if (!id) throw new Error("Order ID required");

    return orderRepository.findById(id, organizationId);
  }

  // ✅ UPDATE (controlled update)
  async update(id: string, organizationId: string, data: UpdateOrderDto) {
    if (!id) throw new Error("Order ID required");

    // prevent empty update
    if (Object.keys(data).length === 0) {
      throw new Error("No update data provided");
    }

    // block negative amount
    if (data.totalAmount !== undefined && data.totalAmount <= 0) {
      throw new Error("Invalid total amount");
    }

    return orderRepository.update(id, organizationId, data);
  }

  // ✅ DELETE (safe check before delete)
  async delete(id: string, organizationId: string) {
    if (!id) throw new Error("Order ID required");

    // optional: future-proof (soft delete recommended)
    return orderRepository.delete(id, organizationId);
  }
}

export default new OrderService();
