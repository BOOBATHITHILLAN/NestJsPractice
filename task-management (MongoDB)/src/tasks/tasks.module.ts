import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './task.model';
import { AuthSchema } from './auth.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: "12345",
  }),MongooseModule.forFeature([{ name:"Task", schema: TaskSchema}]),
  MongooseModule.forFeature([{ name:"Auth", schema: AuthSchema}])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
