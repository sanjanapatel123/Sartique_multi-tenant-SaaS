export interface CreateProductDto {
  name: string;
  sku: string;
  description?: string;
  price: number;
  categoryId?: string;

  attributes?: Record<string, string | number | boolean>;
}

export interface ProductQueryDto {
  page: number;
  limit: number;
  search?: string;
  categoryId?: string;
  isActive?: boolean;
}

export interface ProductQueryDto {
  page: number;
  limit: number;
  search?: string;
  categoryId?: string;
  isActive?: boolean;

  attributes?: Record<string, string>;
}

export interface UpdateProductDto {
  name?: string;
  sku?: string;
  description?: string;
  price?: number;
  categoryId?: string;

  attributes?: Record<string, string | number | boolean>;
}
