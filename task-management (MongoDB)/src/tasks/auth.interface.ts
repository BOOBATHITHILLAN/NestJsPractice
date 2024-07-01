import { Document } from 'mongoose';
//it defines how our data object structure will look like. Its responsible for creation of mongoDB _id
export interface Auth extends Document{
    readonly name: string;
    readonly email: string;
    readonly password: string;
}