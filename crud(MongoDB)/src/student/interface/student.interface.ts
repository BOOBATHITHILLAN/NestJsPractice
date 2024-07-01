import { Document } from 'mongoose';
//it defines how our data object structure will look like
export interface Student extends Document{
    readonly name: string;
    readonly age: number;
    readonly city: string;
    readonly initial: string;
}