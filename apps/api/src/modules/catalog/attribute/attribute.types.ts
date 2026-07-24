export type AttributeType = "TEXT" | "NUMBER" | "SELECT" | "BOOLEAN" | "DATE";

export interface CreateAttributeDto {
  name: string;
  key: string;
  type: AttributeType;
  required?: boolean;
  options?: string[];
}
