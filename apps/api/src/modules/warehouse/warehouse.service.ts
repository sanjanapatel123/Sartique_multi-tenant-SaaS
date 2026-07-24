import warehouseRepository from "./warehouse.repository.js";
import type {
  CreateWarehouseDto,
  UpdateWarehouseDto,
} from "./warehouse.types.js";

class WarehouseService {
  async create(data: CreateWarehouseDto, organizationId: string) {
    const existingWarehouse = await warehouseRepository.findByCode(
      data.code,
      organizationId,
    );

    if (existingWarehouse) {
      throw new Error("Warehouse code already exists");
    }

    return warehouseRepository.create(data, organizationId);
  }

  async findAll(organizationId: string) {
    return warehouseRepository.findAll(organizationId);
  }

  async findById(id: string, organizationId: string) {
    const warehouse = await warehouseRepository.findById(id, organizationId);

    if (!warehouse) {
      throw new Error("Warehouse not found");
    }

    return warehouse;
  }

  async update(id: string, data: UpdateWarehouseDto, organizationId: string) {
    const warehouse = await warehouseRepository.findById(id, organizationId);

    if (!warehouse) {
      throw new Error("Warehouse not found");
    }

    if (data.code && data.code !== warehouse.code) {
      const existingWarehouse = await warehouseRepository.findByCode(
        data.code,
        organizationId,
      );

      if (existingWarehouse) {
        throw new Error("Warehouse code already exists");
      }
    }

    return warehouseRepository.update(id, data);
  }

  async deactivate(id: string, organizationId: string) {
    const warehouse = await warehouseRepository.findById(id, organizationId);

    if (!warehouse) {
      throw new Error("Warehouse not found");
    }

    if (!warehouse.isActive) {
      throw new Error("Warehouse is already inactive");
    }

    return warehouseRepository.deactivate(id);
  }
}

export default new WarehouseService();
