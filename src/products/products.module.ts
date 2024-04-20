import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { ProductTypesService } from './product-types.service';

@Module({
  imports: [DrizzleModule],
  providers: [ProductsResolver, ProductsService, ProductTypesService],
})
export class ProductsModule {}
