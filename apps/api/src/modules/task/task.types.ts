export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "BLOCKED"
  | "COMPLETED"
  | "CANCELLED";

export type TaskPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT";

export interface CreateTaskDto {
  title: string;
  description?: string;

  priority?: TaskPriority;
  dueDate?: Date;

  productionJobId?: string;
  assignedEmployeeId?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string | null;

  status?: TaskStatus;
  priority?: TaskPriority;

  dueDate?: Date | null;

  productionJobId?: string | null;
  assignedEmployeeId?: string | null;
}

export interface TaskQueryDto {
  page: number;
  limit: number;

  search?: string;
  status?: TaskStatus;
  priority?: TaskPriority;

  productionJobId?: string;
  assignedEmployeeId?: string;
}
