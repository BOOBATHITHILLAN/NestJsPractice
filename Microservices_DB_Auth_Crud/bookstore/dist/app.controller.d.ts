/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { AppService } from './app.service';
import { BookDTO } from './Essential/book.dto';
import { ClientProxy } from '@nestjs/microservices';
import { AuthDTO } from './Essential/auth.dto';
export declare class AppController {
    private appService;
    private client;
    constructor(appService: AppService, client: ClientProxy);
    userGetAllBooks(user: any): Promise<(import("mongoose").Document<unknown, {}, import("./Essential/book.interface").Book> & import("./Essential/book.interface").Book & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getOneBook(data: any): Promise<(import("mongoose").Document<unknown, {}, import("./Essential/book.interface").Book> & import("./Essential/book.interface").Book & {
        _id: import("mongoose").Types.ObjectId;
    }) | "Book not exist">;
    newBook(data: BookDTO): Promise<(import("mongoose").Document<unknown, {}, import("./Essential/book.interface").Book> & import("./Essential/book.interface").Book & {
        _id: import("mongoose").Types.ObjectId;
    }) | "Book exist">;
    editBook(datas: any): Promise<(import("mongoose").Document<unknown, {}, import("./Essential/book.interface").Book> & import("./Essential/book.interface").Book & {
        _id: import("mongoose").Types.ObjectId;
    }) | "Book not exist">;
    deleteBook(data: any): Promise<"Book not exist" | {
        deletedBook: import("mongoose").Document<unknown, {}, import("./Essential/book.interface").Book> & import("./Essential/book.interface").Book & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    newUser(data: AuthDTO): Promise<string>;
    signIn(data: any): Promise<"User not exist" | "Password Mismatch" | {
        token: string;
    }>;
    authAddress(data: any): Promise<any>;
    middleware(data: any): Promise<"Exist" | "NotExist">;
}
