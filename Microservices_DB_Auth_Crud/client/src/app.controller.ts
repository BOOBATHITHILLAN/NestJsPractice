import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotAcceptableException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { BookDTO } from './Essential/book.dto';
import { ClientProxy } from '@nestjs/microservices';
import { AuthDTO } from './Essential/auth.dto';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(@Inject('BOOKS_SERVICE') private client: ClientProxy) {}

  @Get('bookstore')
  userGetAllBooks(@Req() request: any) {
    return this.client.send(
      { cmd: 'get_books' },
      { user: request.user.userId },
    );
  }

  @Get('bookstore/:id')
  async getSingleBook(@Param() id: string) {
    const book: any = await firstValueFrom(
      this.client.send({ cmd: 'one_book' }, id),
    );
    if (book === 'Book not exist') {
      throw new NotFoundException('Book not exist');
    } else {
      return book;
    }
  }

  @Post('bookstore')
  async newBook(@Body() data: BookDTO, @Req() request: any) {
    const newBook: any = await firstValueFrom(
      this.client.send(
        { cmd: 'new_book' },
        { ...data, user: request.user.userId },
      ),
    );
    if (newBook === 'Book exist') {
      throw new BadRequestException('Book exist with same details');
    } else {
      return newBook;
    }
  }

  @Patch('bookstore/:id')
  async editBook(@Param() id: string, @Body() data: BookDTO) {
    const editedBook: any = await firstValueFrom(
      this.client.send({ cmd: 'edit_book' }, { id, data }),
    );
    if (editedBook === 'Book not exist') {
      throw new NotFoundException('Book not exist');
    } else {
      return editedBook;
    }
  }

  @Delete('bookstore/:id')
  async deleteBook(@Param() id: string) {
    const deletedBook: any = await firstValueFrom(
      this.client.send({ cmd: 'delete_book' }, id),
    );
    if (deletedBook === 'Book not exist') {
      throw new NotFoundException('Book not exist');
    } else {
      return deletedBook;
    }
  }

  @Post('/auth/signup')
  async newUser(@Body() data: AuthDTO) {
    const user: any = await firstValueFrom(
      this.client.send({ cmd: 'new_user' }, data),
    );
    if (user === 'User exist') {
      throw new NotAcceptableException('User exist, try with new mail id');
    } else {
      return user;
    }
  }

  @Post('/auth/signin')
  async signInUser(@Body() data: any) {
    const userAccessToken: any = await firstValueFrom(
      this.client.send({ cmd: 'signIn_user' }, data),
    );
    if (userAccessToken === 'User not exist') {
      throw new NotFoundException('Invalid user');
    } else if (userAccessToken === 'Password Mismatch') {
      throw new NotAcceptableException('Password : Invalid credentials');
    } else {
      return userAccessToken;
    }
  }

  @Post('/address')
  async authorAddress(@Body() data: any, @Req() request: any) {
    try {
      const authorAddress: any = await firstValueFrom(
        this.client.send(
          { cmd: 'new_address' },
          { ...data, user: request.user.userId },
        ),
      );
      if (authorAddress === 'Same address exist') {
        throw new BadRequestException('User address exist');
      } else if (authorAddress === 'Data error') {
        throw new BadRequestException('All details required');
      } else {
        return authorAddress;
      }
    } catch (error) {
      throw new BadRequestException(
        'Data must needed, Empty data not acceptable',
      );
    }
  }
}
