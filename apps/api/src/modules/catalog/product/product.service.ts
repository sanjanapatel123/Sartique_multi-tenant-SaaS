import productRepository from "./product.repository.js";
import type {
  CreateProductDto,
  ProductQueryDto,
  UpdateProductDto,
} from "./product.types.js";

class ProductService {
  async create(data: CreateProductDto, organizationId: string) {
    // 1. SKU check

    const existingProduct = await productRepository.findBySku(
      data.sku,
      organizationId,
    );

    if (existingProduct) {
      throw new Error("Product SKU already exists");
    }

    // 2. Category check

    if (data.categoryId) {
      const category = await productRepository.findCategory(
        data.categoryId,
        organizationId,
      );

      if (!category) {
        throw new Error("Product category not found or inactive");
      }
    }

    // 3. Get organization attributes

    const definitions =
      await productRepository.findAttributeDefinitions(organizationId);

    const submittedAttributes = data.attributes ?? {};

    const attributeValues: {
      attributeDefinitionId: string;
      value: string | number | boolean;
    }[] = [];

    // 4. Required + type + SELECT validation

    for (const definition of definitions) {
      const value = submittedAttributes[definition.key];

      if (
        definition.required &&
        (value === undefined || value === null || value === "")
      ) {
        throw new Error(`${definition.name} is required`);
      }

      // Optional field not submitted
      if (value === undefined) {
        continue;
      }

      if (definition.type === "TEXT" && typeof value !== "string") {
        throw new Error(`${definition.name} must be text`);
      }

      if (definition.type === "NUMBER" && typeof value !== "number") {
        throw new Error(`${definition.name} must be a number`);
      }

      if (definition.type === "BOOLEAN" && typeof value !== "boolean") {
        throw new Error(`${definition.name} must be true or false`);
      }

      if (definition.type === "DATE") {
        if (typeof value !== "string" || Number.isNaN(Date.parse(value))) {
          throw new Error(`${definition.name} must be a valid date`);
        }
      }

      if (definition.type === "SELECT") {
        if (typeof value !== "string") {
          throw new Error(`${definition.name} must be text`);
        }

        const options = Array.isArray(definition.options)
          ? definition.options
          : [];

        if (!options.includes(value)) {
          throw new Error(`Invalid value for ${definition.name}`);
        }
      }

      attributeValues.push({
        attributeDefinitionId: definition.id,
        value,
      });
    }

    // 5. Reject unknown attributes

    const validKeys = new Set(definitions.map((definition) => definition.key));

    for (const key of Object.keys(submittedAttributes)) {
      if (!validKeys.has(key)) {
        throw new Error(`Unknown product attribute: ${key}`);
      }
    }

    // 6. Create product

    return productRepository.create(data, organizationId, attributeValues);
  }

  async findAll(organizationId: string, query: ProductQueryDto) {
    const { products, total } = await productRepository.findAll(
      organizationId,
      query,
    );

    return {
      products,

      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }

  async findById(id: string, organizationId: string) {
    const product = await productRepository.findById(id, organizationId);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  async update(id: string, data: UpdateProductDto, organizationId: string) {
    const product = await productRepository.findById(id, organizationId);

    if (!product) {
      throw new Error("Product not found");
    }

    // SKU validation
    if (data.sku && data.sku !== product.sku) {
      const existing = await productRepository.findBySku(
        data.sku,
        organizationId,
      );

      if (existing) {
        throw new Error("Product SKU already exists");
      }
    }

    // Category validation
    if (data.categoryId) {
      const category = await productRepository.findCategory(
        data.categoryId,
        organizationId,
      );

      if (!category) {
        throw new Error("Product category not found or inactive");
      }
    }

    const attributeValues: {
      attributeDefinitionId: string;
      value: string | number | boolean;
    }[] = [];

    if (data.attributes) {
      const definitions =
        await productRepository.findAttributeDefinitions(organizationId);

      const definitionMap = new Map(
        definitions.map((definition) => [definition.key, definition]),
      );

      for (const [key, value] of Object.entries(data.attributes)) {
        const definition = definitionMap.get(key);

        if (!definition) {
          throw new Error(`Unknown product attribute: ${key}`);
        }

        if (definition.type === "TEXT" && typeof value !== "string") {
          throw new Error(`${definition.name} must be text`);
        }

        if (definition.type === "NUMBER" && typeof value !== "number") {
          throw new Error(`${definition.name} must be a number`);
        }

        if (definition.type === "BOOLEAN" && typeof value !== "boolean") {
          throw new Error(`${definition.name} must be true or false`);
        }

        if (definition.type === "SELECT") {
          const options = Array.isArray(definition.options)
            ? definition.options
            : [];

          if (typeof value !== "string" || !options.includes(value)) {
            throw new Error(`Invalid value for ${definition.name}`);
          }
        }

        attributeValues.push({
          attributeDefinitionId: definition.id,
          value,
        });
      }
    }

    return productRepository.update(id, data, attributeValues);
  }

  async deactivate(id: string, organizationId: string) {
    const product = await productRepository.findById(id, organizationId);

    if (!product) {
      throw new Error("Product not found");
    }

    if (!product.isActive) {
      throw new Error("Product is already inactive");
    }

    return productRepository.deactivate(id);
  }
}

export default new ProductService();
