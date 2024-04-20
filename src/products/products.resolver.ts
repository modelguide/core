import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { NewProductInput } from './dto/new-product.input';
import { ProductsArgs } from './dto/products.args';
import { Product } from './models/product.model';
import { ProductsService } from './products.service';
import { ProductTypesService } from './product-types.service';


@Resolver(() => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productTypesService: ProductTypesService
  ) {}

  @Query(returns => Product)
  async product(@Args('id') id: string): Promise<Product> {
    const product = await this.productsService.findOneById(id);
  
    if (!product) {
      throw new NotFoundException(id);
    }
  
    return product;
  }

  @Query(returns => [Product])
  products(@Args() productsArgs: ProductsArgs): Promise<Product[]> {
    return this.productsService.findAll(productsArgs);
  }

  @Mutation(returns => Product)
  async createProduct(
    @Args('newProductData') newProductData: NewProductInput,
  ): Promise<Product> {
    const product = await this.productsService.create(newProductData);
    return product;
  }

  @ResolveField()
  async type(@Parent() product: Product) {
    // TODO: dataloader
    if (product.type) {
      const productType = await this.productTypesService.findOneById(product.type.id)
    
      return productType
    }

    return null
  }
}
