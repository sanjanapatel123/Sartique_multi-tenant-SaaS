import { OrderStatus } from "@prisma/client";

export interface CreateOrderDto {
  title: string;
  description?: string;
  totalAmount: number;
  customerId: string;
}

export interface UpdateOrderDto {
  title?: string;
  description?: string;
  totalAmount?: number;
  status?: OrderStatus;
}

export interface OrderQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  status?: OrderStatus;
}
