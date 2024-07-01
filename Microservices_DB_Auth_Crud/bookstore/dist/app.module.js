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
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const bookSchema_1 = require("./Essential/bookSchema");
const authSchema_1 = require("./Essential/authSchema");
const jwt_1 = require("@nestjs/jwt");
const jwt_constants_1 = require("./Essential/jwt.constants");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                global: true,
                secret: jwt_constants_1.jwtConstants.secret,
            }),
            mongoose_1.MongooseModule.forFeature([{ name: 'Book', schema: bookSchema_1.BookSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Auth', schema: authSchema_1.AuthSchema }]),
            mongoose_1.MongooseModule.forRoot(process.env.MongoUrl),
            config_1.ConfigModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: 'ADDRESS_SERVICE',
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    return microservices_1.ClientProxyFactory.create({
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: configService.get('ADDRESS_SERVICE_HOST'),
                            port: 3000,
                        },
                    });
                },
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map