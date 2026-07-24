export type MeasurementUnit = "INCH" | "CM";

export interface CreateMeasurementDefinitionInput {
  name: string;
  key: string;
  unit?: MeasurementUnit;
  description?: string;
}

export interface UpdateMeasurementDefinitionInput {
  name?: string;
  unit?: MeasurementUnit;
  description?: string;
  isActive?: boolean;
}