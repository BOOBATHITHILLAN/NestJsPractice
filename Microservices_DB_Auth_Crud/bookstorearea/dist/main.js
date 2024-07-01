"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            port: 3000,
        },
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        exceptionFactory: (validationErrors = []) => {
            console.error(JSON.stringify(validationErrors));
            return new common_1.BadRequestException(validationErrors);
        },
        transform: true,
    }));
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map