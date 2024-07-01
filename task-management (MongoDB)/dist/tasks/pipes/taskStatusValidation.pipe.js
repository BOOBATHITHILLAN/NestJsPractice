"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatusValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const tasks_enum_1 = require("../tasks.enum");
class TaskStatusValidationPipe {
    constructor() {
        this.allowedStatus = [
            tasks_enum_1.TaskStatus.OPEN,
            tasks_enum_1.TaskStatus.IN_PROGRESS,
            tasks_enum_1.TaskStatus.DONE
        ];
    }
    transform(value) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new common_1.BadRequestException(`${value} is an invalid status`);
        }
        return value;
    }
    isStatusValid(status) {
        const index = this.allowedStatus.indexOf(status);
        return index !== -1;
    }
}
exports.TaskStatusValidationPipe = TaskStatusValidationPipe;
//# sourceMappingURL=taskStatusValidation.pipe.js.map