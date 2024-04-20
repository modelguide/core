import { pgTable, pgEnum, uuid, timestamp, varchar, primaryKey, integer, text, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
// import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

//docker run --name postgresCont -p 5432:5432 -e POSTGRES_PASSWORD=pass123 -e POSTGRES_DB=cpq postgres

export const availabilityState = pgEnum("state", ["published", "draft"])

export const product = pgTable("product", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  price: integer("price").notNull(),
  state: availabilityState("state").default("draft").notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
  productTypeId: uuid("product_type_id").notNull(),
});

export const productRelations = relations(product, ({ many, one }) => ({
  restrictionWith: many(restriction, { relationName: "restriction_with" }),
  restrictionTo: many(restriction, { relationName: "restriction_to" }),
  categories: many(productToCategory, { relationName: "categories" }),
  type: one(productType, {
    fields: [product.productTypeId],
    references: [productType.id],
  }),
}));

export const category = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  state: availabilityState("state").default("draft").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
});

export const categoryRelations = relations(category, ({ many }) => ({
  products: many(productToCategory, { relationName: "products" }),
}));

export const productToCategory = pgTable(
  "product_to_category",
  {
    productId: uuid("product_id").notNull().references(() => product.id),
    categoryId: uuid("category_id").notNull().references(() => category.id),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.productId, t.categoryId],
    }),
  })
);

export const productToCategoryRelations = relations(productToCategory, ({ one }) => ({
  category: one(category, {
    fields: [productToCategory.categoryId],
    references: [category.id],
    relationName: "products",
  }),
  product: one(product, {
    fields: [productToCategory.productId],
    references: [product.id],
    relationName: "categories",
  }),
}));

export const restriction = pgTable(
  "restriction",
  {
    restrictionWithId: uuid("restriction_with_id").notNull(),
    restrictionToId: uuid("restriction_to_id").notNull(),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.restrictionWithId, t.restrictionToId],
    }),
  })
);

export const restrictionRelations = relations(restriction, ({ one }) => ({
  restrictionWith: one(product, {
    fields: [restriction.restrictionWithId],
    references: [product.id],
    relationName: "restriction_with",
  }),
  restrictionTo: one(product, {
    fields: [restriction.restrictionToId],
    references: [product.id],
    relationName: "restriction_to",
  }),
}));


export const productConfiguration = pgTable("product_configuration", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description").notNull(),
  state: availabilityState("state").default("draft").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull(),
});

export const productConfigurationRelations = relations(productConfiguration, ({ many }) => ({
  parts: many(configurationPart, { relationName: "parts" }),
}));

export const configurationPart = pgTable("configuration_part", {
  id: uuid("id").primaryKey().defaultRandom(),
  productConfigurationId: uuid("product_configuration_id").notNull(),
  productTypeId: uuid("product_type_id").notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  isRequired: boolean("is_required").default(false).notNull(),
  state: availabilityState("state").default("draft").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull(),
});


export const configurationPartRelations = relations(configurationPart, ({ one }) => ({
  productConfiguration: one(productConfiguration, {
    fields: [configurationPart.productConfigurationId],
    references: [productConfiguration.id],
    relationName: "parts",
  }),
  productType: one(productType, {
    fields: [configurationPart.productTypeId],
    references: [productType.id],
    relationName: "productType",
  })
}));

export const productType = pgTable("product_type", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  state: availabilityState("state").default("draft").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull(),
});

export type SelectProduct = typeof product.$inferSelect;
export type SelectCategory = typeof category.$inferSelect;
export type InsertCategory = typeof category.$inferInsert;

// export const categoryInsertSchema = createInsertSchema(category);
// export const categorySelectSchema = createSelectSchema(category);