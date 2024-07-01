import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/Essential/jwt.constants';
import { Response, NextFunction } from 'express';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject('BOOKS_SERVICE') private client: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    const token: any = req.headers.authorization;
    if (!token) {
      throw new UnauthorizedException();
    }
    const payload = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });
    req.user = { userId: payload.userId };
    const userExist: any = await firstValueFrom(
      this.client.send({ cmd: 'middleware' }, payload.userId),
    );

    if (userExist !== 'Exist') {
      throw new UnauthorizedException('User not exist');
    }
    next();
  }
}
