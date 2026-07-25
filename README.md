# Sartique — Multi-Tenant SaaS ERP

Sartique is a multi-tenant SaaS ERP platform for bespoke fashion and lifestyle brands. It is designed to manage customers, orders, inventory, warehouses, and dynamic product catalogs while keeping each organization's data completely isolated.

🌐 **Live Demo:** https://sartique.netlify.app/

## Tech Stack

**Frontend:** Next.js, React, TypeScript, Tailwind CSS
**Backend:** Node.js, Hono, TypeScript, Prisma ORM
**Database:** PostgreSQL
**Auth:** JWT, RBAC
**Validation:** Zod

## Approach

I designed the backend around a **multi-tenant architecture**, where every business operates inside its own organization and data is scoped using `organizationId`.

Instead of building separate systems for different businesses, I used a **dynamic configuration approach**.

For example:

```text
Fashion → Color, Fabric, Embroidery
Jewelry → Metal, Purity, Weight
```

The same Product API can support both without changing the database schema.

The backend follows:

```text
Route → Controller → Service → Repository → Prisma → PostgreSQL
```

This keeps validation, business logic, and database operations separated and maintainable.

## What I've Built

* JWT authentication and RBAC
* Multi-tenant organization isolation
* Customer and Order management
* Warehouse and Inventory management
* Stock In / Stock Out
* Stock reservation and release
* Stock adjustments and movement history
* Dynamic product categories
* Dynamic product attributes
* Product search, filtering and pagination
* Product lifecycle management

## Challenges & Solutions

### Multi-Tenant Data Isolation

**Problem:** Preventing one organization from accessing another organization's customers, products, or inventory.

**Solution:** Organization identity is stored in the authenticated JWT context and `organizationId` is enforced throughout organization-scoped database operations.

### Different Product Structures

**Problem:** Fashion products need fields like `fabric` and `embroidery`, while another business may require completely different fields.

**Solution:** Built dynamic `AttributeDefinition` and `ProductAttribute` models instead of hardcoding product fields.

### Inventory Consistency

**Problem:** Stock needs to support available, reserved, released, consumed, and manually corrected quantities.

**Solution:** Separated stock state from immutable stock movement records and implemented operations such as:

```text
STOCK_IN
STOCK_OUT
RESERVE
RELEASE
ADJUSTMENT_IN
ADJUSTMENT_OUT
```

### Dynamic Filtering

**Problem:** Product filters cannot be hardcoded because each organization defines different attributes.

**Solution:** Implemented dynamic queries such as:

```text
/products?attr_color=Red&attr_fabric=Silk
```

and validate filter keys against the organization's attribute definitions.

## What I Learned

Building this project has helped me understand:

* Multi-tenant SaaS architecture
* Designing scalable database relationships
* Tenant-aware authorization
* Dynamic schema/configuration patterns
* Inventory and stock reservation logic
* Prisma transactions and relational queries
* REST API architecture
* RBAC and JWT authentication
* Separating controllers, services, and repositories
* Designing backend systems around real business workflows

## Next

Currently working on:

**Measurement System → Production Workflow → Task Management → POS → Payments → Workflow Automation → Redis/BullMQ → AI features**

The long-term goal is to evolve Bespokible into an **AI-native SaaS operating system for bespoke businesses**.
