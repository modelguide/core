import { Inject, Injectable } from '@nestjs/common';
import { NewProductInput } from './dto/new-product.input';
import { ProductsArgs } from './dto/products.args';
import { Product } from './models/product.model';
import { DrizzleDb } from './../drizzle/db/client';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { product } from 'src/drizzle/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProductsService {
  constructor(@Inject(DrizzleAsyncProvider) private db: DrizzleDb) { }

  async create(data: NewProductInput): Promise<Product> {
    const result = await this.db.insert(product).values(data).returning()

    const newProduct = {
      id: result[0].id,
      name: result[0].name,
      price: result[0].price,
      state: result[0].state,
      description: result[0].description,
      createdAt: result[0].createdAt,
      updatedAt: result[0].updatedAt,
      type: {
        id: result[0].productTypeId,
      }
    }

    return newProduct
  }

  async findOneById(id: string): Promise<Product | null> {
    const result = await this.db.query.product.findFirst({
      where: eq(product.id, id),
    })

    if (!result) {
      return null
    }

    const foundProduct = {
      id: result.id,
      name: result.name,
      price: result.price,
      state: result.state,
      description: result.description,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      type: {
        id: result.productTypeId,
      }
    }

    return foundProduct
  }

  async findAll(productArgs: ProductsArgs): Promise<Product[]> {
    const results = await this.db.query.product.findMany({
      limit: productArgs.take,
      offset: productArgs.skip,
    })

    return results.map((result) => ({
      id: result.id,
      name: result.name,
      price: result.price,
      state: result.state,
      description: result.description,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      type: {
        id: result.productTypeId,
      }
    }))
  }
}
