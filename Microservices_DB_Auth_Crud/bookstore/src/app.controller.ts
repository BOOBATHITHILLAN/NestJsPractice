import { BadRequestException, Body, Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { BookDTO } from './Essential/book.dto';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { AuthDTO } from './Essential/auth.dto';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    @Inject('ADDRESS_SERVICE') private client: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'get_books' })
  userGetAllBooks(@Body() user: any) {
    return this.appService.userGetAllBooks(user);
  }

  @MessagePattern({ cmd: 'one_book' })
  getOneBook(@Body() data: any) {
    return this.appService.getOneBook(data);
  }

  @MessagePattern({ cmd: 'new_book' })
  newBook(@Body() data: BookDTO) {
    return this.appService.newBook(data);
  }

  @MessagePattern({ cmd: 'edit_book' })
  editBook(@Body() datas: any) {
    return this.appService.editBook(datas);
  }

  @MessagePattern({ cmd: 'delete_book' })
  deleteBook(@Body() data: any) {
    return this.appService.deleteBook(data);
  }

  @MessagePattern({ cmd: 'new_user' })
  async newUser(@Body() data: AuthDTO) {
    return this.appService.newUser(data);
  }

  @MessagePattern({ cmd: 'signIn_user' })
  signIn(@Body() data: any) {
    return this.appService.signIn(data);
  }

  @MessagePattern({ cmd: 'new_address' })
  async authAddress(@Body() data: any) {
    try {
      const address: any = await firstValueFrom(
        this.client.send({ cmd: 'new_address' }, data),
      );
      return address;
    } catch (error) {
      throw new BadRequestException('Data should not empty');
    }
  }

  @MessagePattern({ cmd: 'middleware' })
  middleware(@Body() data: any) {
    return this.appService.middleware(data);
  }
}
