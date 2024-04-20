import { createDbClient } from './client';
import {
  product,
  configurationPart,
  restriction,
  productType,
  category,
  productConfiguration,
  productToCategory
} from './schema';

const { db, connection } = createDbClient();

const seed = async () => {
  const productType1 = await db.insert(productType).values({ name: "Graphics card" }).returning();
  const productType2 = await db.insert(productType).values({ name: "RAM" }).returning();
  const productType3 = await db.insert(productType).values({ name: "Cooling" }).returning();
  const productType4 = await db.insert(productType).values({ name: "Hard drive" }).returning();


  const category1 = await db.insert(category).values({ name: "Gaming PCs" }).returning();
  const category2 = await db.insert(category).values({ name: "Crypto mining" }).returning();

  const product1 = await db.insert(product).values({
    name: "RTX 3080",
    description: "Nvidia RTX 3080",
    state: "draft",
    price: 69999,
    productTypeId: productType1[0].id
  }).returning();


  const product2 = await db.insert(product).values({
    name: "RTX 3080",
    description: "Nvidia RTX 4090",
    state: "draft",
    price: 400099,
    productTypeId: productType1[0].id
  }).returning();

  const product3 = await db.insert(product).values({
    name: "1 TB",
    description: "1 TB RAM",
    state: "draft",
    price: 3599,
    productTypeId: productType2[0].id
  }).returning();


  const product4 = await db.insert(product).values({
    name: "2 TB",
    description: "2 TB RAM",
    state: "draft",
    price: 9899,
    productTypeId: productType2[0].id
  }).returning();


  const product5 = await db.insert(product).values({
    name: "Xeon",
    description: "Xeon cooling system",
    state: "draft",
    price: 24599,
    productTypeId: productType3[0].id

  }).returning();


  const product6 = await db.insert(product).values({
    name: "Roger cooler",
    description: "Roger cooler",
    state: "draft",
    price: 14599,
    productTypeId: productType3[0].id
  }).returning();


  const product7 = await db.insert(product).values({
    name: "SSD 512",
    description: "SSD 512",
    state: "draft",
    price: 3999,
    productTypeId: productType4[0].id
  }).returning();


  const product8 = await db.insert(product).values({
    name: "SSD 1TB",
    description: "SSD 1TB",
    state: "draft",
    price: 7999,
    productTypeId: productType4[0].id

  }).returning();


  await db.insert(productToCategory).values([
    { productId: product1[0].id, categoryId: category1[0].id },
    { productId: product2[0].id, categoryId: category1[0].id },
    { productId: product3[0].id, categoryId: category1[0].id },
    { productId: product4[0].id, categoryId: category1[0].id },
    { productId: product5[0].id, categoryId: category1[0].id },
    { productId: product6[0].id, categoryId: category1[0].id },
    { productId: product7[0].id, categoryId: category1[0].id },
    { productId: product8[0].id, categoryId: category1[0].id },
    { productId: product1[0].id, categoryId: category2[0].id },
    { productId: product2[0].id, categoryId: category2[0].id },
  ]).execute();

  await db.insert(restriction).values({
    restrictionToId: product2[0].id,
    restrictionWithId: product6[0].id
  }).execute();

  await db.insert(restriction).values({
    restrictionToId: product2[0].id,
    restrictionWithId: product3[0].id
  }).execute();


  const productConfiguration1 = await db.insert(productConfiguration).values({
    name: "PC",
    description: "Gaming PC",
    state: "draft",
  }).returning();

  await db.insert(configurationPart).values({
    name: "Graphics",
    state: "draft",
    isRequired: true,
    productTypeId: productType1[0].id,
    productConfigurationId: productConfiguration1[0].id
  }).execute();

  await db.insert(configurationPart).values({
    name: "RAM",
    state: "draft",
    isRequired: true,
    productTypeId: productType2[0].id,
    productConfigurationId: productConfiguration1[0].id
  }).execute();

  await db.insert(configurationPart).values({
    name: "Cooling",
    state: "draft",
    isRequired: true,
    productTypeId: productType3[0].id,
    productConfigurationId: productConfiguration1[0].id
  }).execute();

  await db.insert(configurationPart).values({
    name: "Hard Drive",
    state: "draft",
    isRequired: true,
    productTypeId: productType4[0].id,
    productConfigurationId: productConfiguration1[0].id
  }).execute();


  await connection.end();
}

seed();