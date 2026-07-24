import attributeRepository from "./attribute.repository.js";

import type { CreateAttributeDto } from "./attribute.types.js";

class AttributeService {
  async create(data: CreateAttributeDto, organizationId: string) {
    const existing = await attributeRepository.findByKey(
      data.key,
      organizationId,
    );

    if (existing) {
      throw new Error("Attribute key already exists");
    }

    return attributeRepository.create(data, organizationId);
  }

  async findAll(organizationId: string) {
    return attributeRepository.findAll(organizationId);
  }
}

export default new AttributeService();
