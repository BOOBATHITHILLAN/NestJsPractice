"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const jwt_1 = require("@nestjs/jwt");
const jwt_constants_1 = require("../Essential/jwt.constants");
const rxjs_1 = require("rxjs");
let LoggerMiddleware = class LoggerMiddleware {
    constructor(client, jwtService) {
        this.client = client;
        this.jwtService = jwtService;
    }
    async use(req, res, next) {
        const token = req.headers.authorization;
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        const payload = await this.jwtService.verifyAsync(token, {
            secret: jwt_constants_1.jwtConstants.secret,
        });
        req.user = { userId: payload.userId };
        const userExist = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'middleware' }, payload.userId));
        if (userExist !== 'Exist') {
            throw new common_1.UnauthorizedException('User not exist');
        }
        next();
    }
};
exports.LoggerMiddleware = LoggerMiddleware;
exports.LoggerMiddleware = LoggerMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('BOOKS_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        jwt_1.JwtService])
], LoggerMiddleware);
//# sourceMappingURL=logger.middleware.js.map