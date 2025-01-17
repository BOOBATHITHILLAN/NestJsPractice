import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as cors from "cors"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cors())
  await app.listen(8000);
}
bootstrap();
