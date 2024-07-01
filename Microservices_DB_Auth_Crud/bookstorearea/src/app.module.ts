import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressSchema } from './Essentials/addressSchema';
import * as dotenv from "dotenv";
dotenv.config();

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Address', schema: AddressSchema }]),
  MongooseModule.forRoot(process.env.MongoUrl),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
