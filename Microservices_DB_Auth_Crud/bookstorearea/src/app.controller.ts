import {
  Body,
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { AddressDTO } from './Essentials/address.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'new_address' })
  @UsePipes(ValidationPipe)
  async newBook(@Body() data: AddressDTO) {
    return this.appService.newAddress(data);
  }
}
