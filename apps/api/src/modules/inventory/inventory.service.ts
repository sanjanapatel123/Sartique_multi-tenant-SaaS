import inventoryRepository from "./inventory.repository.js";
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

class InventoryService {
  async create(data: CreateInventoryItemDto, organizationId: string) {
    const existingItem = await inventoryRepository.findBySku(
      data.sku,
      organizationId,
    );

    if (existingItem) {
      throw new Error("Inventory item SKU already exists");
    }

    return inventoryRepository.create(data, organizationId);
  }

  async findAll(organizationId: string, query: InventoryQueryDto) {
    const { items, total } = await inventoryRepository.findAll(
      organizationId,
      query,
    );

    return {
      items,

      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }

  async findById(id: string, organizationId: string) {
    const item = await inventoryRepository.findById(id, organizationId);

    if (!item) {
      throw new Error("Inventory item not found");
    }

    const stocks = item.stocks.map((stock) => {
      const quantity = Number(stock.quantity);
      const reserved = Number(stock.reserved);

      return {
        ...stock,
        available: quantity - reserved,
      };
    });

    return {
      ...item,
      stocks,
    };
  }

  async stockIn(data: StockInDto, organizationId: string) {
    const item = await inventoryRepository.findItemById(
      data.inventoryItemId,
      organizationId,
    );

    if (!item) {
      throw new Error("Inventory item not found");
    }

    const warehouse = await inventoryRepository.findWarehouseById(
      data.warehouseId,
      organizationId,
    );

    if (!warehouse) {
      throw new Error("Warehouse not found or inactive");
    }

    return inventoryRepository.stockIn(data, organizationId);
  }

  async stockOut(data: StockOutDto, organizationId: string) {
    const item = await inventoryRepository.findItemById(
      data.inventoryItemId,
      organizationId,
    );

    if (!item) {
      throw new Error("Inventory item not found");
    }

    const warehouse = await inventoryRepository.findWarehouseById(
      data.warehouseId,
      organizationId,
    );

    if (!warehouse) {
      throw new Error("Warehouse not found or inactive");
    }

    const stock = await inventoryRepository.findStock(
      data.inventoryItemId,
      data.warehouseId,
    );

    if (!stock) {
      throw new Error("Stock not found");
    }

    const quantity = Number(stock.quantity);
    const reserved = Number(stock.reserved);

    const availableStock = quantity - reserved;

    if (data.quantity > availableStock) {
      throw new Error(`Insufficient stock. Available stock: ${availableStock}`);
    }

    return inventoryRepository.stockOut(data, organizationId);
  }

  async reserveStock(data: ReserveStockDto, organizationId: string) {
    const item = await inventoryRepository.findItemById(
      data.inventoryItemId,
      organizationId,
    );

    if (!item) {
      throw new Error("Inventory item not found");
    }

    const warehouse = await inventoryRepository.findWarehouseById(
      data.warehouseId,
      organizationId,
    );

    if (!warehouse) {
      throw new Error("Warehouse not found or inactive");
    }

    const stock = await inventoryRepository.findStock(
      data.inventoryItemId,
      data.warehouseId,
    );

    if (!stock) {
      throw new Error("Stock not found");
    }

    const quantity = Number(stock.quantity);
    const reserved = Number(stock.reserved);

    const availableStock = quantity - reserved;

    if (data.quantity > availableStock) {
      throw new Error(
        `Insufficient available stock. Available stock: ${availableStock}`,
      );
    }

    return inventoryRepository.reserveStock(data, organizationId);
  }

  async releaseStock(data: ReleaseStockDto, organizationId: string) {
    const item = await inventoryRepository.findItemById(
      data.inventoryItemId,
      organizationId,
    );

    if (!item) {
      throw new Error("Inventory item not found");
    }

    const warehouse = await inventoryRepository.findWarehouseById(
      data.warehouseId,
      organizationId,
    );

    if (!warehouse) {
      throw new Error("Warehouse not found or inactive");
    }

    const stock = await inventoryRepository.findStock(
      data.inventoryItemId,
      data.warehouseId,
    );

    if (!stock) {
      throw new Error("Stock not found");
    }

    const reserved = Number(stock.reserved);

    if (data.quantity > reserved) {
      throw new Error(
        `Cannot release more than reserved stock. Reserved stock: ${reserved}`,
      );
    }

    return inventoryRepository.releaseStock(data, organizationId);
  }

  async findLowStock(organizationId: string) {
    const items = await inventoryRepository.findLowStock(organizationId);

    return items
      .map((item) => {
        const lowStocks = item.stocks
          .map((stock) => {
            const quantity = Number(stock.quantity);
            const reserved = Number(stock.reserved);
            const threshold = Number(item.lowStockThreshold);

            const available = quantity - reserved;

            return {
              warehouse: stock.warehouse,
              quantity,
              reserved,
              available,
              threshold,
              isLowStock: available <= threshold,
            };
          })
          .filter((stock) => stock.isLowStock);

        return {
          id: item.id,
          name: item.name,
          sku: item.sku,
          category: item.category,
          unit: item.unit,
          lowStockThreshold: Number(item.lowStockThreshold),
          stocks: lowStocks,
        };
      })
      .filter((item) => item.stocks.length > 0);
  }

  async findMovements(organizationId: string, query: StockMovementQueryDto) {
    const { movements, total } = await inventoryRepository.findMovements(
      organizationId,
      query,
    );

    return {
      movements,

      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }

  async update(
    id: string,
    data: UpdateInventoryItemDto,
    organizationId: string,
  ) {
    const item = await inventoryRepository.findItemById(id, organizationId);

    if (!item) {
      throw new Error("Inventory item not found");
    }

    if (data.sku && data.sku !== item.sku) {
      const existingItem = await inventoryRepository.findBySku(
        data.sku,
        organizationId,
      );

      if (existingItem) {
        throw new Error("Inventory item SKU already exists");
      }
    }

    return inventoryRepository.update(id, data);
  }

  async adjustStock(data: AdjustStockDto, organizationId: string) {
    const item = await inventoryRepository.findItemById(
      data.inventoryItemId,
      organizationId,
    );

    if (!item) {
      throw new Error("Inventory item not found");
    }

    const warehouse = await inventoryRepository.findWarehouseById(
      data.warehouseId,
      organizationId,
    );

    if (!warehouse) {
      throw new Error("Warehouse not found or inactive");
    }

    const stock = await inventoryRepository.findStock(
      data.inventoryItemId,
      data.warehouseId,
    );

    if (!stock) {
      throw new Error("Stock not found");
    }

    if (data.type === "ADJUSTMENT_OUT") {
      const quantity = Number(stock.quantity);
      const reserved = Number(stock.reserved);

      const available = quantity - reserved;

      if (data.quantity > available) {
        throw new Error(
          `Cannot adjust below reserved stock. Available stock: ${available}`,
        );
      }
    }

    return inventoryRepository.adjustStock(data, organizationId);
  }

  async deactivate(id: string, organizationId: string) {
    const item = await inventoryRepository.findItemById(id, organizationId);

    if (!item) {
      throw new Error("Inventory item not found");
    }

    if (!item.isActive) {
      throw new Error("Inventory item is already inactive");
    }

    return inventoryRepository.deactivate(id);
  }
}

export default new InventoryService();
