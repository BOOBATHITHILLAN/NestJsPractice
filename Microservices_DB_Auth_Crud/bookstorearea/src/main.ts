import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3000,
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe(
      {
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        console.error(JSON.stringify(validationErrors));
        return new BadRequestException(validationErrors);
      },
      transform: true,
    }
    ),
  );
  await app.listen();
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);
}
bootstrap();
