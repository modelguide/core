import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { AvailabilityState } from '../models/product.model';

@InputType()
export class NewProductInput {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field(type => AvailabilityState)
  @IsOptional()
  state: AvailabilityState;

  @Field()
  productTypeId: string;

  @Field({ nullable: true })
  @IsOptional()
  description: string;
}
