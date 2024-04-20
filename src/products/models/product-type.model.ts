import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AvailabilityState } from './product.model';


@ObjectType({ description: 'product-type' })
export class ProductType {
  @Field(type => ID)
  id: string;

  @Field(type => String)
  name?: string;

  @Field(type => AvailabilityState)
  state?:string;

  @Field(type => Date)
  createdAt?: Date;

  @Field(type => Date)
  updatedAt?: Date;
}
