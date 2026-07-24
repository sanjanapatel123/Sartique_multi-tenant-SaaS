import prisma from "../../lib/prisma.js";
import type {
  AdjustStockDto,
  CreateInventoryItemDto,
  InventoryQueryDto,
  ReleaseStockDto,
  ReserveStockDto,
  StockInDto,
  StockMovementQueryDto,
  StockOutDto,
  UpdateInventoryItemDto,
} from "./inventory.types.js";

class InventoryRepository {
  async findBySku(sku: string, organizationId: string) {
    return prisma.inventoryItem.findUnique({
      where: {
        organizationId_sku: {
          organizationId,
          sku,
        },
      },
    });
  }

  async create(data: CreateInventoryItemDto, organizationId: string) {
    return prisma.inventoryItem.create({
      data: {
        name: data.name,
        sku: data.sku,
        category: data.category,
        unit: data.unit,
        description: data.description,
        lowStockThreshold: data.lowStockThreshold,
        organizationId,
      },
    });
  }

  async findAll(organizationId: string, query: InventoryQueryDto) {
    const { page, limit, search, category, unit } = query;

    const skip = (page - 1) * limit;

    const where = {
      organizationId,

      ...(category && {
        category,
      }),

      ...(unit && {
        unit,
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
    };

    const [items, total] = await prisma.$transaction([
      prisma.inventoryItem.findMany({
        where,

        skip,

        take: limit,

        orderBy: {
          createdAt: "desc",
        },

        include: {
          stocks: {
            select: {
              quantity: true,
              reserved: true,

              warehouse: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                },
              },
            },
          },
        },
      }),

      prisma.inventoryItem.count({
        where,
      }),
    ]);

    return {
      items,
      total,
    };
  }

  async findById(id: string, organizationId: string) {
    return prisma.inventoryItem.findFirst({
      where: {
        id,
        organizationId,
      },

      include: {
        stocks: {
          include: {
            warehouse: {
              select: {
                id: true,
                name: true,
                code: true,
                isActive: true,
              },
            },
          },
        },
      },
    });
  }

  async stockIn(data: StockInDto, organizationId: string) {
    return prisma.$transaction(async (tx) => {
      const stock = await tx.inventoryStock.upsert({
        where: {
          inventoryItemId_warehouseId: {
            inventoryItemId: data.inventoryItemId,
            warehouseId: data.warehouseId,
          },
        },

        update: {
          quantity: {
            increment: data.quantity,
          },
        },

        create: {
          inventoryItemId: data.inventoryItemId,
          warehouseId: data.warehouseId,
          quantity: data.quantity,
        },
      });

      const movement = await tx.stockMovement.create({
        data: {
          type: "STOCK_IN",
          quantity: data.quantity,

          referenceType: data.referenceType,
          referenceId: data.referenceId,
          note: data.note,

          inventoryItemId: data.inventoryItemId,
          warehouseId: data.warehouseId,
          organizationId,
        },
      });

      return {
        stock,
        movement,
      };
    });
  }

  async findItemById(id: string, organizationId: string) {
    return prisma.inventoryItem.findFirst({
      where: {
        id,
        organizationId,
      },
    });
  }

  async findWarehouseById(id: string, organizationId: string) {
    return prisma.warehouse.findFirst({
      where: {
        id,
        organizationId,
        isActive: true,
      },
    });
  }

  async findStock(inventoryItemId: string, warehouseId: string) {
    return prisma.inventoryStock.findUnique({
      where: {
        inventoryItemId_warehouseId: {
          inventoryItemId,
          warehouseId,
        },
      },
    });
  }

  async stockOut(data: StockOutDto, organizationId: string) {
    return prisma.$transaction(async (tx) => {
      const stock = await tx.inventoryStock.update({
        where: {
          inventoryItemId_warehouseId: {
            inventoryItemId: data.inventoryItemId,
            warehouseId: data.warehouseId,
          },
        },

        data: {
          quantity: {
            decrement: data.quantity,
          },
        },
      });

      const movement = await tx.stockMovement.create({
        data: {
          type: "STOCK_OUT",
          quantity: data.quantity,

          referenceType: data.referenceType,
          referenceId: data.referenceId,
          note: data.note,

          inventoryItemId: data.inventoryItemId,
          warehouseId: data.warehouseId,
          organizationId,
        },
      });

      return {
        stock,
        movement,
      };
    });
  }

  async reserveStock(data: ReserveStockDto, organizationId: string) {
    return prisma.$transaction(async (tx) => {
      const stock = await tx.inventoryStock.update({
        where: {
          inventoryItemId_warehouseId: {
            inventoryItemId: data.inventoryItemId,
            warehouseId: data.warehouseId,
          },
        },

        data: {
          reserved: {
            increment: data.quantity,
          },
        },
      });

      const movement = await tx.stockMovement.create({
        data: {
          type: "RESERVE",
          quantity: data.quantity,

          referenceType: data.referenceType,
          referenceId: data.referenceId,
          note: data.note,

          inventoryItemId: data.inventoryItemId,
          warehouseId: data.warehouseId,
          organizationId,
        },
      });

      return {
        stock,
        movement,
      };
    });
  }

  async releaseStock(data: ReleaseStockDto, organizationId: string) {
    return prisma.$transaction(async (tx) => {
      const stock = await tx.inventoryStock.update({
        where: {
          inventoryItemId_warehouseId: {
            inventoryItemId: data.inventoryItemId,
            warehouseId: data.warehouseId,
          },
        },

        data: {
          reserved: {
            decrement: data.quantity,
          },
        },
      });

      const movement = await tx.stockMovement.create({
        data: {
          type: "RELEASE",
          quantity: data.quantity,

          referenceType: data.referenceType,
          referenceId: data.referenceId,
          note: data.note,

          inventoryItemId: data.inventoryItemId,
          warehouseId: data.warehouseId,
          organizationId,
        },
      });

      return {
        stock,
        movement,
      };
    });
  }

  async findLowStock(organizationId: string) {
    return prisma.inventoryItem.findMany({
      where: {
        organizationId,
      },

      include: {
        stocks: {
          include: {
            warehouse: {
              select: {
                id: true,
                name: true,
                code: true,
              },
            },
          },
        },
      },

      orderBy: {
        name: "asc",
      },
    });
  }

  async findMovements(organizationId: string, query: StockMovementQueryDto) {
    const { page, limit, inventoryItemId, warehouseId, type, referenceId } =
      query;

    const skip = (page - 1) * limit;

    const where = {
      organizationId,

      ...(inventoryItemId && {
        inventoryItemId,
      }),

      ...(warehouseId && {
        warehouseId,
      }),

      ...(type && {
        type,
      }),

      ...(referenceId && {
        referenceId,
      }),
    };

    const [movements, total] = await prisma.$transaction([
      prisma.stockMovement.findMany({
        where,

        skip,
        take: limit,

        orderBy: {
          createdAt: "desc",
        },

        include: {
          inventoryItem: {
            select: {
              id: true,
              name: true,
              sku: true,
              unit: true,
            },
          },

          warehouse: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
      }),

      prisma.stockMovement.count({
        where,
      }),
    ]);

    return {
      movements,
      total,
    };
  }

  async update(id: string, data: UpdateInventoryItemDto) {
    return prisma.inventoryItem.update({
      where: {
        id,
      },
      data,
    });
  }

  async adjustStock(data: AdjustStockDto, organizationId: string) {
    return prisma.$transaction(async (tx) => {
      const stock = await tx.inventoryStock.update({
        where: {
          inventoryItemId_warehouseId: {
            inventoryItemId: data.inventoryItemId,
            warehouseId: data.warehouseId,
          },
        },

        data: {
          quantity:
            data.type === "ADJUSTMENT_IN"
              ? { increment: data.quantity }
              : { decrement: data.quantity },
        },
      });

      const movement = await tx.stockMovement.create({
        data: {
          type: data.type,
          quantity: data.quantity,
          note: data.note,

          referenceType: "MANUAL_ADJUSTMENT",

          inventoryItemId: data.inventoryItemId,
          warehouseId: data.warehouseId,
          organizationId,
        },
      });

      return {
        stock,
        movement,
      };
    });
  }

  async deactivate(id: string) {
    return prisma.inventoryItem.update({
      where: {
        id,
      },

      data: {
        isActive: false,
      },
    });
  }
}

export default new InventoryRepository();
