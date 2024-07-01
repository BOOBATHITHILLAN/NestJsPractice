import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { URL } from './config/DB.config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot(URL, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log('is connected');
        });
        connection.on('disconnected', () => {
          console.log('DB disconnected');
        });
        connection.on('error', (error:any) => {
          console.log('DB connection failed! for error: ', error);
        });
        return connection;
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
