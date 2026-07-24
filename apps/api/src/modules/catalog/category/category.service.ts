import categoryRepository from "./category.repository.js";
import type { CreateCategoryDto, UpdateCategoryDto } from "./category.types.js";

class CategoryService {
  async create(data: CreateCategoryDto, organizationId: string) {
    const slug = data.name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const existingCategory = await categoryRepository.findBySlug(
      slug,
      organizationId,
    );

    if (existingCategory) {
      throw new Error("Category already exists");
    }

    return categoryRepository.create(data, slug, organizationId);
  }

  async findAll(organizationId: string) {
    return categoryRepository.findAll(organizationId);
  }

  async update(id: string, data: UpdateCategoryDto, organizationId: string) {
    const category = await categoryRepository.findById(id, organizationId);

    if (!category) {
      throw new Error("Category not found");
    }

    let slug: string | undefined;

    if (data.name) {
      slug = data.name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      if (slug !== category.slug) {
        const existing = await categoryRepository.findBySlug(
          slug,
          organizationId,
        );

        if (existing) {
          throw new Error("Category already exists");
        }
      }
    }

    return categoryRepository.update(id, data, slug);
  }

  async deactivate(id: string, organizationId: string) {
    const category = await categoryRepository.findById(id, organizationId);

    if (!category) {
      throw new Error("Category not found");
    }

    if (!category.isActive) {
      throw new Error("Category is already inactive");
    }

    return categoryRepository.deactivate(id);
  }
}

export default new CategoryService();
