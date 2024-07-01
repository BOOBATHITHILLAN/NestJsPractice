import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StudentDocument = HydratedDocument<Student>;

@Schema()
export class Student {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  city: string;

  @Prop()
  initial: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);