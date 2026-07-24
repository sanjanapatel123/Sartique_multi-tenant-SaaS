export interface CreateCustomerDto {
  name: string;
  email?: string;
  phone: string;
}

export interface UpdateCustomerDto {
  name?: string;
  email?: string;
  phone?: string;
}
