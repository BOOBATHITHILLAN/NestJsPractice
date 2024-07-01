import { TaskStatus } from "./tasks.enum";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument=HydratedDocument<Task>;

@Schema()
export class Task{
    @Prop()
    title:string;

    @Prop()
    description:string;

    @Prop()
    status:TaskStatus;
}

export const TaskSchema=SchemaFactory.createForClass(Task);

