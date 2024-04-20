import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ProductType } from './product-type.model';

export enum AvailabilityState {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

registerEnumType(AvailabilityState, { name: "AvailabilityState" });

@ObjectType({ description: 'product' })
export class Product {
  @Field(type => ID)
  id: string;

  @Field(type => String)
  name: string;

  @Field(type => Number)
  price: number

  @Field(type => AvailabilityState)
  state:string;

  @Field(type => String)
  description: string;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;

  @Field(type => ProductType, { nullable: true })
  type?: ProductType
}
