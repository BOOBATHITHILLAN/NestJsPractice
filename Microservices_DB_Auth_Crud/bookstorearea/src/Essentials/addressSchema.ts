import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AddressDocument = HydratedDocument<Address>;

@Schema()
export class Address {
  @Prop()
  doorNumber:string;

  @Prop()
  street:string;

  @Prop()
  country:string;

  @Prop()
  user:string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
