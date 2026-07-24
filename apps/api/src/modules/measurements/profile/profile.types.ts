export interface CreateProfileDto {
  customerId: string;
  templateId: string;
  name: string;
  values: Record<string, number>;
  note?: string;
}

export interface CreateMeasurementVersionDto {
  values: Record<string, number>;
  note?: string;
}

export interface UpdateProfileDto {
  name?: string;
  isActive?: boolean;
}
