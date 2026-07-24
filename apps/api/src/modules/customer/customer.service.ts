import customerRepository from "./customer.repository.js";

import type { CreateCustomerDto, UpdateCustomerDto } from "./customer.types.js";

class CustomerService {
  async create(data: CreateCustomerDto, organizationId: string) {
    const existingCustomer = await customerRepository.findByPhone(
      data.phone,
      organizationId,
    );

    if (existingCustomer) {
      throw new Error("Customer with this phone number already exists");
    }

    return customerRepository.create(data, organizationId);
  }

  async findAll(organizationId: string) {
    return customerRepository.findAll(organizationId);
  }

  async findById(id: string, organizationId: string) {
    const customer = await customerRepository.findById(id, organizationId);

    if (!customer) {
      throw new Error("Customer not found");
    }

    return customer;
  }

  async update(id: string, organizationId: string, data: UpdateCustomerDto) {
    const customer = await customerRepository.findById(id, organizationId);

    if (!customer) {
      throw new Error("Customer not found");
    }

    if (data.phone && data.phone !== customer.phone) {
      const existingCustomer = await customerRepository.findByPhone(
        data.phone,
        organizationId,
      );

      if (existingCustomer) {
        throw new Error("Customer with this phone number already exists");
      }
    }

    return customerRepository.update(id, organizationId, data);
  }

  async delete(id: string, organizationId: string) {
    const customer = await customerRepository.findById(id, organizationId);

    if (!customer) {
      throw new Error("Customer not found");
    }

    return customerRepository.delete(id, organizationId);
  }
}

export default new CustomerService();
