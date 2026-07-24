import profileRepository from "./profile.repository.js";

import type { CreateMeasurementVersionDto, CreateProfileDto, UpdateProfileDto } from "./profile.types.js";

class ProfileService {
  async create(data: CreateProfileDto, organizationId: string) {
    // 1. Customer check
    const customer = await profileRepository.findCustomer(
      data.customerId,
      organizationId,
    );

    if (!customer) {
      throw new Error("Customer not found");
    }

    // 2. Template check
    const template = await profileRepository.findTemplate(
      data.templateId,
      organizationId,
    );

    if (!template) {
      throw new Error("Measurement template not found or inactive");
    }

    // 3. Build definition map
    const definitionMap = new Map(
      template.fields.map((field) => [field.measurementDefinition.key, field]),
    );

    // 4. Reject unknown measurements
    for (const key of Object.keys(data.values)) {
      if (!definitionMap.has(key)) {
        throw new Error(`Unknown measurement: ${key}`);
      }
    }

    // 5. Required measurement validation
    for (const field of template.fields) {
      const key = field.measurementDefinition.key;
      const value = data.values[key];

      if (field.required && value === undefined) {
        throw new Error(`${field.measurementDefinition.name} is required`);
      }
    }

    // 6. Convert keys into definition IDs
    const measurementValues = Object.entries(data.values).map(
      ([key, value]) => {
        const field = definitionMap.get(key);

        if (!field) {
          throw new Error(`Unknown measurement: ${key}`);
        }

        return {
          measurementDefinitionId: field.measurementDefinition.id,
          value,
        };
      },
    );

    // 7. Create Profile + Version 1
    return profileRepository.create(data, organizationId, measurementValues);
  }

  async findAll(organizationId: string) {
    return profileRepository.findAll(organizationId);
  }

  async findById(id: string, organizationId: string) {
    const profile = await profileRepository.findById(id, organizationId);

    if (!profile) {
      throw new Error("Measurement profile not found");
    }

    return profile;
  }

  async update(id: string, data: UpdateProfileDto, organizationId: string) {
    const profile = await profileRepository.findById(id, organizationId);

    if (!profile) {
      throw new Error("Measurement profile not found");
    }

    return profileRepository.update(id, data);
  }

  async deactivate(id: string, organizationId: string) {
    const profile = await profileRepository.findById(id, organizationId);

    if (!profile) {
      throw new Error("Measurement profile not found");
    }

    if (!profile.isActive) {
      throw new Error("Measurement profile is already inactive");
    }

    return profileRepository.deactivate(id);
  }

  async createVersion(
    profileId: string,
    data: CreateMeasurementVersionDto,
    organizationId: string,
  ) {
    // 1. Profile check
    const profile = await profileRepository.findById(profileId, organizationId);

    if (!profile) {
      throw new Error("Measurement profile not found");
    }

    if (!profile.isActive) {
      throw new Error("Measurement profile is inactive");
    }

    // 2. Template fields
    const definitionMap = new Map(
      profile.template.fields.map((field) => [
        field.measurementDefinition.key,
        field,
      ]),
    );

    // 3. Reject unknown measurements
    for (const key of Object.keys(data.values)) {
      if (!definitionMap.has(key)) {
        throw new Error(`Unknown measurement: ${key}`);
      }
    }

    // 4. Required fields check
    for (const field of profile.template.fields) {
      const key = field.measurementDefinition.key;

      if (field.required && data.values[key] === undefined) {
        throw new Error(`${field.measurementDefinition.name} is required`);
      }
    }

    // 5. Convert keys → definition IDs
    const measurementValues = Object.entries(data.values).map(
      ([key, value]) => {
        const field = definitionMap.get(key);

        if (!field) {
          throw new Error(`Unknown measurement: ${key}`);
        }

        return {
          measurementDefinitionId: field.measurementDefinition.id,
          value,
        };
      },
    );

    // 6. Find latest version
    const latestVersion = await profileRepository.findLatestVersion(profileId);

    const nextVersion = (latestVersion?.version ?? 0) + 1;

    // 7. Create new version
    return profileRepository.createVersion(
      profileId,
      nextVersion,
      data.note,
      measurementValues,
    );
  }
}

export default new ProfileService();
