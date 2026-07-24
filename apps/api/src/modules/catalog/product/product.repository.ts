import prisma from "../../../lib/prisma.js";
import type {
  CreateProductDto,
  ProductQueryDto,
  UpdateProductDto,
} from "./product.types.js";

class ProductRepository {
  async findBySku(sku: string, organizationId: string) {
    return prisma.product.findUnique({
      where: {
        organizationId_sku: {
          organizationId,
          sku,
        },
      },
    });
  }

  async findCategory(categoryId: string, organizationId: string) {
    return prisma.productCategory.findFirst({
      where: {
        id: categoryId,
        organizationId,
        isActive: true,
      },
    });
  }

  async findAttributeDefinitions(organizationId: string) {
    return prisma.attributeDefinition.findMany({
      where: {
        organizationId,
      },
    });
  }

  async create(
    data: CreateProductDto,
    organizationId: string,
    attributeValues: {
      attributeDefinitionId: string;
      value: string | number | boolean;
    }[],
  ) {
    return prisma.product.create({
      data: {
        name: data.name,
        sku: data.sku,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        organizationId,

        attributes: {
          create: attributeValues.map((attribute) => ({
            attributeDefinitionId: attribute.attributeDefinitionId,

            value: attribute.value,
          })),
        },
      },

      include: {
        category: true,

        attributes: {
          include: {
            attributeDefinition: true,
          },
        },
      },
    });
  }

  async findAll(organizationId: string, query: ProductQueryDto) {
    const { page, limit, search, categoryId, isActive, attributes } = query;

    const skip = (page - 1) * limit;

    const attributeConditions = Object.entries(attributes ?? {}).map(
      ([key, value]) => ({
        attributes: {
          some: {
            attributeDefinition: {
              key,
              organizationId,
            },

            value: {
              equals: value,
            },
          },
        },
      }),
    );
    const where = {
      organizationId,

      ...(categoryId && {
        categoryId,
      }),

      ...(isActive !== undefined && {
        isActive,
      }),

      ...(search && {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            sku: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        ],
      }),

      ...(attributeConditions.length > 0 && {
        AND: attributeConditions,
      }),
    };

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,

        skip,
        take: limit,

        orderBy: {
          createdAt: "desc",
        },

        include: {
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },

          attributes: {
            include: {
              attributeDefinition: {
                select: {
                  id: true,
                  name: true,
                  key: true,
                  type: true,
                },
              },
            },
          },
        },
      }),

      prisma.product.count({
        where,
      }),
    ]);

    return {
      products,
      total,
    };
  }

  async findById(id: string, organizationId: string) {
    return prisma.product.findFirst({
      where: {
        id,
        organizationId,
      },

      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },

        attributes: {
          include: {
            attributeDefinition: {
              select: {
                id: true,
                name: true,
                key: true,
                type: true,
                required: true,
                options: true,
              },
            },
          },
        },
      },
    });
  }

  async update(
    id: string,
    data: UpdateProductDto,
    attributeValues: {
      attributeDefinitionId: string;
      value: string | number | boolean;
    }[],
  ) {
    return prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: {
          id,
        },

        data: {
          name: data.name,
          sku: data.sku,
          description: data.description,
          price: data.price,
          categoryId: data.categoryId,
        },
      });

      for (const attribute of attributeValues) {
        await tx.productAttribute.upsert({
          where: {
            productId_attributeDefinitionId: {
              productId: id,
              attributeDefinitionId: attribute.attributeDefinitionId,
            },
          },

          update: {
            value: attribute.value,
          },

          create: {
            productId: id,
            attributeDefinitionId: attribute.attributeDefinitionId,
            value: attribute.value,
          },
        });
      }

      return tx.product.findUnique({
        where: {
          id,
        },

        include: {
          category: true,

          attributes: {
            include: {
              attributeDefinition: true,
            },
          },
        },
      });
    });
  }

  async deactivate(id: string) {
    return prisma.product.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }
}

export default new ProductRepository();
