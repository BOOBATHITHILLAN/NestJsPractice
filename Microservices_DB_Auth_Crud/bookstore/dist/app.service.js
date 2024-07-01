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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AppService = class AppService {
    constructor(BookModel, AuthModel, jwtService) {
        this.BookModel = BookModel;
        this.AuthModel = AuthModel;
        this.jwtService = jwtService;
    }
    async userGetAllBooks(data) {
        const userBooks = await this.BookModel.find({ user: data.user });
        return userBooks;
    }
    async getOneBook(data) {
        const book = await this.BookModel.findOne({ _id: data.id });
        if (!book) {
            return 'Book not exist';
        }
        return book;
    }
    async newBook(data) {
        const existBook = await this.BookModel.findOne({
            title: data.title,
            author: data.author,
        });
        if (existBook) {
            return 'Book exist';
        }
        const Book = new this.BookModel(data);
        return await Book.save();
    }
    async editBook(datas) {
        const book = await this.BookModel.findOne({ _id: datas.id.id });
        if (!book) {
            return 'Book not exist';
        }
        await this.BookModel.findOneAndUpdate({ _id: datas.id.id }, datas.data);
        const updatedBook = await this.BookModel.findOne({ _id: datas.id.id });
        return updatedBook;
    }
    async deleteBook(data) {
        const book = await this.BookModel.findOne({ _id: data.id });
        if (!book) {
            return 'Book not exist';
        }
        const deletedBook = await this.BookModel.findOneAndDelete({ _id: data.id });
        return { deletedBook: deletedBook };
    }
    async newUser(data) {
        const { name, email, password } = data;
        const userExist = await this.AuthModel.findOne({ email: email });
        if (userExist) {
            return 'User exist';
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.AuthModel({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();
        return `Hi ${name} - Your account created successfully...`;
    }
    async signIn(data) {
        const { email, password } = data;
        const userExist = await this.AuthModel.findOne({ email: email });
        if (!userExist) {
            return 'User not exist';
        }
        const isMatchPassword = await bcrypt.compare(password, userExist.password);
        if (isMatchPassword) {
            const token = await this.jwtService.signAsync({ userId: userExist._id });
            return { token: token };
        }
        return 'Password Mismatch';
    }
    async middleware(data) {
        const userExist = await this.AuthModel.findOne({ _id: data });
        if (userExist) {
            return 'Exist';
        }
        return 'NotExist';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Book')),
    __param(1, (0, mongoose_1.InjectModel)('Auth')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], AppService);
//# sourceMappingURL=app.service.js.map