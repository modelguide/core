import { Inject, Injectable } from '@nestjs/common';
import { DrizzleDb } from '../drizzle/db/client';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { productType } from 'src/drizzle/db/schema';
import { eq } from 'drizzle-orm';
import { ProductType } from './models/product-type.model';

@Injectable()
export class ProductTypesService {
  constructor(@Inject(DrizzleAsyncProvider) private db: DrizzleDb) { }

  async findOneById(id: string): Promise<ProductType | null> {
    const result = await this.db.query.productType.findFirst({
      where: eq(productType.id, id),
    })

    if (!result) {
      return null
    }

    const foundType = {
      id: result.id,
      name: result.name,
      state: result.state,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    }

    return foundType
  }
}
