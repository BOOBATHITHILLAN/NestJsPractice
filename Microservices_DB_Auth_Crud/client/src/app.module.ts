import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './Middleware/logger.middleware';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './Essential/jwt.constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'BOOKS_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('BOOKSTORE_SERVICE_HOST'),
            port: 3001,
          },
        });
      },
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        { path: 'bookstore', method: RequestMethod.ALL },
        { path: 'address', method: RequestMethod.ALL },
      );
  }
}
