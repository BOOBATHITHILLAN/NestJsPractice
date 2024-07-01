import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://boobathi:boobathi1996@cluster0.hztozhy.mongodb.net/crudNestJS?retryWrites=true&w=majority',
    ),
    StudentModule,
  ],
})
export class AppModule {}
