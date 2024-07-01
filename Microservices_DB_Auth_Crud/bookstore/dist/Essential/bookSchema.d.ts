import mongoose, { HydratedDocument } from 'mongoose';
import { Auth } from './authSchema';
export type BookDocument = HydratedDocument<Book>;
export declare class Book {
    title: string;
    author: string;
    release_date: Date;
    user: Auth;
}
export declare const BookSchema: mongoose.Schema<Book, mongoose.Model<Book, any, any, any, mongoose.Document<unknown, any, Book> & Book & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Book, mongoose.Document<unknown, {}, Book> & Book & {
    _id: mongoose.Types.ObjectId;
}>;
