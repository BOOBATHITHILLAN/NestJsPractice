import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Auth } from './authSchema';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  release_date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' })
  user: Auth;
  // @Prop()
  // user: mongoose.Schema.Types.ObjectId;
}

export const BookSchema = SchemaFactory.createForClass(Book);
