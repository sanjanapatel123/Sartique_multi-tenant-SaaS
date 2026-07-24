export type ProductionStatus =
  | "PENDING"
  | "CUTTING"
  | "STITCHING"
  | "FINISHING"
  | "QC"
  | "COMPLETED"
  | "ON_HOLD"
  | "CANCELLED";

export type ProductionPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT";

export interface CreateProductionJobDto {
  jobNumber: string;
  orderId: string;
  assignedEmployeeId?: string;

  priority?: ProductionPriority;

  startDate?: Date;
  dueDate?: Date;

  notes?: string;
}

export interface UpdateProductionJobDto {
  assignedEmployeeId?: string | null;

  status?: ProductionStatus;
  priority?: ProductionPriority;

  startDate?: Date | null;
  dueDate?: Date | null;

  notes?: string | null;
}

export interface ProductionQueryDto {
  page: number;
  limit: number;

  search?: string;

  status?: ProductionStatus;
  priority?: ProductionPriority;

  assignedEmployeeId?: string;
  orderId?: string;
}
