import measurementDefinitionRepository from "./measurement-definition.repository.js";

import type {
  CreateMeasurementDefinitionInput,
  UpdateMeasurementDefinitionInput,
} from "./measurement-definition.types.js";

class MeasurementDefinitionService {
  async create(
    organizationId: string,
    input: CreateMeasurementDefinitionInput,
  ) {
    const existing = await measurementDefinitionRepository.findByKey(
      input.key,
      organizationId,
    );

    if (existing) {
      throw new Error(
        `Measurement definition with key "${input.key}" already exists`,
      );
    }

    return measurementDefinitionRepository.create({
      ...input,
      unit: input.unit ?? "INCH",
      organizationId,
    });
  }

  async findAll(organizationId: string) {
    return measurementDefinitionRepository.findAll(organizationId);
  }

  async findById(id: string, organizationId: string) {
    const definition = await measurementDefinitionRepository.findById(
      id,
      organizationId,
    );

    if (!definition) {
      throw new Error("Measurement definition not found");
    }

    return definition;
  }

  async update(
    id: string,
    organizationId: string,
    input: UpdateMeasurementDefinitionInput,
  ) {
    const existing = await measurementDefinitionRepository.findById(
      id,
      organizationId,
    );

    if (!existing) {
      throw new Error("Measurement definition not found");
    }

    return measurementDefinitionRepository.update(id, organizationId, input);
  }

  async deactivate(id: string, organizationId: string) {
    const existing = await measurementDefinitionRepository.findById(
      id,
      organizationId,
    );

    if (!existing) {
      throw new Error("Measurement definition not found");
    }

    if (!existing.isActive) {
      throw new Error("Measurement definition is already inactive");
    }

    return measurementDefinitionRepository.deactivate(id, organizationId);
  }
}

export default new MeasurementDefinitionService();
