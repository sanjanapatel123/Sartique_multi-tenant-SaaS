export interface TemplateFieldDto {
  measurementDefinitionId: string;
  required?: boolean;
  sortOrder?: number;
}

export interface CreateTemplateDto {
  name: string;
  description?: string;
  fields: TemplateFieldDto[];
}

export interface UpdateTemplateDto {
  name?: string;
  description?: string;
  isActive?: boolean;
  fields?: TemplateFieldDto[];
}
