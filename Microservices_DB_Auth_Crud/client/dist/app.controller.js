"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
let AppController = class AppController {
    constructor(client) {
        this.client = client;
    }
    userGetAllBooks(request) {
        return this.client.send({ cmd: 'get_books' }, { user: request.user.userId });
    }
    async getSingleBook(id) {
        const book = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'one_book' }, id));
        if (book === 'Book not exist') {
            throw new common_1.NotFoundException('Book not exist');
        }
        else {
            return book;
        }
    }
    async newBook(data, request) {
        const newBook = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'new_book' }, { ...data, user: request.user.userId }));
        if (newBook === 'Book exist') {
            throw new common_1.BadRequestException('Book exist with same details');
        }
        else {
            return newBook;
        }
    }
    async editBook(id, data) {
        const editedBook = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'edit_book' }, { id, data }));
        if (editedBook === 'Book not exist') {
            throw new common_1.NotFoundException('Book not exist');
        }
        else {
            return editedBook;
        }
    }
    async deleteBook(id) {
        const deletedBook = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'delete_book' }, id));
        if (deletedBook === 'Book not exist') {
            throw new common_1.NotFoundException('Book not exist');
        }
        else {
            return deletedBook;
        }
    }
    async newUser(data) {
        const user = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'new_user' }, data));
        if (user === 'User exist') {
            throw new common_1.NotAcceptableException('User exist, try with new mail id');
        }
        else {
            return user;
        }
    }
    async signInUser(data) {
        const userAccessToken = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'signIn_user' }, data));
        if (userAccessToken === 'User not exist') {
            throw new common_1.NotFoundException('Invalid user');
        }
        else if (userAccessToken === 'Password Mismatch') {
            throw new common_1.NotAcceptableException('Password : Invalid credentials');
        }
        else {
            return userAccessToken;
        }
    }
    async authorAddress(data, request) {
        try {
            const authorAddress = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'new_address' }, { ...data, user: request.user.userId }));
            if (authorAddress === 'Same address exist') {
                throw new common_1.BadRequestException('User address exist');
            }
            else if (authorAddress === 'Data error') {
                throw new common_1.BadRequestException('All details required');
            }
            else {
                return authorAddress;
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('Data must needed, Empty data not acceptable');
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('bookstore'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "userGetAllBooks", null);
__decorate([
    (0, common_1.Get)('bookstore/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getSingleBook", null);
__decorate([
    (0, common_1.Post)('bookstore'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "newBook", null);
__decorate([
    (0, common_1.Patch)('bookstore/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "editBook", null);
__decorate([
    (0, common_1.Delete)('bookstore/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteBook", null);
__decorate([
    (0, common_1.Post)('/auth/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "newUser", null);
__decorate([
    (0, common_1.Post)('/auth/signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "signInUser", null);
__decorate([
    (0, common_1.Post)('/address'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "authorAddress", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)('BOOKS_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], AppController);
//# sourceMappingURL=app.controller.js.map