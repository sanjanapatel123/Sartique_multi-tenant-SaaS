export interface CreateWarehouseDto {
  name: string;
  code: string;
  address?: string;
}

export interface UpdateWarehouseDto {
  name?: string;
  code?: string;
  address?: string;
  isActive?: boolean;
}
