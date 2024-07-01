"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("@nestjs/config");
const logger_middleware_1 = require("./Middleware/logger.middleware");
const jwt_1 = require("@nestjs/jwt");
const jwt_constants_1 = require("./Essential/jwt.constants");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes({ path: 'bookstore', method: common_1.RequestMethod.ALL }, { path: 'address', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                global: true,
                secret: jwt_constants_1.jwtConstants.secret,
            }),
            config_1.ConfigModule.forRoot(),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: 'BOOKS_SERVICE',
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    return microservices_1.ClientProxyFactory.create({
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: configService.get('BOOKSTORE_SERVICE_HOST'),
                            port: 3001,
                        },
                    });
                },
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map