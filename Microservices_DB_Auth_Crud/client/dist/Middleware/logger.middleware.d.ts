import { NestMiddleware } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { Response, NextFunction } from 'express';
export declare class LoggerMiddleware implements NestMiddleware {
    private client;
    private jwtService;
    constructor(client: ClientProxy, jwtService: JwtService);
    use(req: any, res: Response, next: NextFunction): Promise<void>;
}
