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
const tasks_module_1 = require("./tasks/tasks.module");
const mongoose_1 = require("@nestjs/mongoose");
const DB_config_1 = require("./config/DB.config");
const auth_controller_1 = require("./auth/auth.controller");
const auth_service_1 = require("./auth/auth.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            tasks_module_1.TasksModule,
            mongoose_1.MongooseModule.forRoot(DB_config_1.URL, {
                connectionFactory: (connection) => {
                    connection.on('connected', () => {
                        console.log('is connected');
                    });
                    connection.on('disconnected', () => {
                        console.log('DB disconnected');
                    });
                    connection.on('error', (error) => {
                        console.log('DB connection failed! for error: ', error);
                    });
                    return connection;
                },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map