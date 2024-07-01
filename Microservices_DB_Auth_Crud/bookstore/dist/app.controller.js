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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
let AppController = class AppController {
    constructor(appService, client) {
        this.appService = appService;
        this.client = client;
    }
    userGetAllBooks(user) {
        return this.appService.userGetAllBooks(user);
    }
    getOneBook(data) {
        return this.appService.getOneBook(data);
    }
    newBook(data) {
        return this.appService.newBook(data);
    }
    editBook(datas) {
        return this.appService.editBook(datas);
    }
    deleteBook(data) {
        return this.appService.deleteBook(data);
    }
    async newUser(data) {
        return this.appService.newUser(data);
    }
    signIn(data) {
        return this.appService.signIn(data);
    }
    async authAddress(data) {
        try {
            const address = await (0, rxjs_1.firstValueFrom)(this.client.send({ cmd: 'new_address' }, data));
            return address;
        }
        catch (error) {
            throw new common_1.BadRequestException('Data should not empty');
        }
    }
    middleware(data) {
        return this.appService.middleware(data);
    }
};
exports.AppController = AppController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_books' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "userGetAllBooks", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'one_book' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getOneBook", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'new_book' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "newBook", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'edit_book' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "editBook", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_book' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteBook", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'new_user' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "newUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'signIn_user' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "signIn", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'new_address' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "authAddress", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'middleware' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "middleware", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, common_1.Inject)('ADDRESS_SERVICE')),
    __metadata("design:paramtypes", [app_service_1.AppService,
        microservices_1.ClientProxy])
], AppController);
//# sourceMappingURL=app.controller.js.map