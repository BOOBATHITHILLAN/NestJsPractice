import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './Essential/bookSchema';
import { AuthSchema } from './Essential/authSchema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './Essential/jwt.constants';
import {ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),
    MongooseModule.forRoot(process.env.MongoUrl),
    ConfigModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'ADDRESS_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('ADDRESS_SERVICE_HOST'),
            port: 3000,
          },
        });
      },
    },
  ],
})
export class AppModule {}
