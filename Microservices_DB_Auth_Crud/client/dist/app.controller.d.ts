import { BookDTO } from './Essential/book.dto';
import { ClientProxy } from '@nestjs/microservices';
import { AuthDTO } from './Essential/auth.dto';
export declare class AppController {
    private client;
    constructor(client: ClientProxy);
    userGetAllBooks(request: any): import("rxjs").Observable<any>;
    getSingleBook(id: string): Promise<any>;
    newBook(data: BookDTO, request: any): Promise<any>;
    editBook(id: string, data: BookDTO): Promise<any>;
    deleteBook(id: string): Promise<any>;
    newUser(data: AuthDTO): Promise<any>;
    signInUser(data: any): Promise<any>;
    authorAddress(data: any, request: any): Promise<any>;
}
