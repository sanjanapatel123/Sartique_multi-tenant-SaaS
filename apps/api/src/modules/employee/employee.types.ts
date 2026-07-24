export interface CreateEmployeeDto {
  employeeCode: string;
  name: string;
  email?: string;
  phone?: string;
  designation?: string;
  department?: string;
  joiningDate?: Date;
}

export interface UpdateEmployeeDto {
  employeeCode?: string;
  name?: string;
  email?: string | null;
  phone?: string | null;
  designation?: string | null;
  department?: string | null;
  joiningDate?: Date | null;
  isActive?: boolean;
}

export interface EmployeeQueryDto {
  page: number;
  limit: number;
  search?: string;
  department?: string;
  isActive?: boolean;
}
