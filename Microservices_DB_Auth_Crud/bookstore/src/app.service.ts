import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './Essential/book.interface';
import { BookDTO } from './Essential/book.dto';
import { Auth } from './Essential/auth.interface';
import { AuthDTO } from './Essential/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Book') private BookModel: Model<Book>,
    @InjectModel('Auth') private AuthModel: Model<Auth>,
    private jwtService: JwtService, 
  ) {}

  async userGetAllBooks(data: any) {
    const userBooks = await this.BookModel.find({ user: data.user });
    return userBooks;
  }

  async getOneBook(data: any) {
    const book = await this.BookModel.findOne({ _id: data.id });
    if (!book) {
      return 'Book not exist';
    }
    return book;
  }

  async newBook(data: BookDTO) {
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

  async editBook(datas: any) {
    const book = await this.BookModel.findOne({ _id: datas.id.id });
    if (!book) {
      return 'Book not exist';
    }
    await this.BookModel.findOneAndUpdate({ _id: datas.id.id }, datas.data);
    const updatedBook = await this.BookModel.findOne({ _id: datas.id.id });
    return updatedBook;
  }

  async deleteBook(data: any) {
    const book = await this.BookModel.findOne({ _id: data.id });
    if (!book) {
      return 'Book not exist';
    }
    const deletedBook = await this.BookModel.findOneAndDelete({ _id: data.id });
    return { deletedBook: deletedBook };
  }

  async newUser(data: AuthDTO) {
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

  async signIn(data: any) {
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

  async middleware(data: any) {
    const userExist = await this.AuthModel.findOne({ _id: data });
    // console.log(userExist)
    if (userExist) {
      return 'Exist';
    }
    return 'NotExist';
  }
}
