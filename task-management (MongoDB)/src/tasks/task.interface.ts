import { Document } from 'mongoose';
//it defines how our data object structure will look like. Its responsible for creation of mongoDB _id
export interface Task extends Document{
    readonly title: string;
    readonly description: string;
    readonly status: string;
}