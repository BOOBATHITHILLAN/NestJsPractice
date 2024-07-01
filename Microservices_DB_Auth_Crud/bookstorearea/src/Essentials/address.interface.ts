import { Document } from 'mongoose';
//it defines how our data object structure will look like. Its responsible for creation of mongoDB _id
export interface Address extends Document {
  readonly doorNumber: string;
  readonly street: string;
  readonly country: string;
  readonly user:string;
}
