import templateRepository from "./template.repository.js";

import type { CreateTemplateDto, UpdateTemplateDto } from "./template.types.js";

class TemplateService {
  async create(data: CreateTemplateDto, organizationId: string) {
    // 1. Duplicate template name check
    const existing = await templateRepository.findByName(
      data.name,
      organizationId,
    );

    if (existing) {
      throw new Error("Measurement template already exists");
    }

    // 2. Duplicate measurement definitions check
    const definitionIds = data.fields.map(
      (field) => field.measurementDefinitionId,
    );

    if (new Set(definitionIds).size !== definitionIds.length) {
      throw new Error("Duplicate measurement fields are not allowed");
    }

    // 3. Check definitions belong to organization and are active
    const definitions = await templateRepository.findDefinitions(
      definitionIds,
      organizationId,
    );

    if (definitions.length !== definitionIds.length) {
      throw new Error(
        "One or more measurement definitions are invalid or inactive",
      );
    }

    return templateRepository.create(data, organizationId);
  }

  async findAll(organizationId: string) {
    return templateRepository.findAll(organizationId);
  }

  async findById(id: string, organizationId: string) {
    const template = await templateRepository.findById(id, organizationId);

    if (!template) {
      throw new Error("Measurement template not found");
    }

    return template;
  }

  async update(id: string, data: UpdateTemplateDto, organizationId: string) {
    // 1. Template check
    const template = await templateRepository.findById(id, organizationId);

    if (!template) {
      throw new Error("Measurement template not found");
    }

    // 2. Name duplicate check
    if (data.name && data.name !== template.name) {
      const existing = await templateRepository.findByName(
        data.name,
        organizationId,
      );

      if (existing) {
        throw new Error("Measurement template already exists");
      }
    }

    // 3. Fields validation
    if (data.fields) {
      const definitionIds = data.fields.map(
        (field) => field.measurementDefinitionId,
      );

      if (new Set(definitionIds).size !== definitionIds.length) {
        throw new Error("Duplicate measurement fields are not allowed");
      }

      const definitions = await templateRepository.findDefinitions(
        definitionIds,
        organizationId,
      );

      if (definitions.length !== definitionIds.length) {
        throw new Error(
          "One or more measurement definitions are invalid or inactive",
        );
      }
    }

    return templateRepository.update(id, data);
  }

  async deactivate(id: string, organizationId: string) {
    const template = await templateRepository.findById(id, organizationId);

    if (!template) {
      throw new Error("Measurement template not found");
    }

    if (!template.isActive) {
      throw new Error("Measurement template is already inactive");
    }

    return templateRepository.deactivate(id);
  }
}

export default new TemplateService();
