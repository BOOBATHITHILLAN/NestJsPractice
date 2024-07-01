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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const createTask_dto_1 = require("./dto/createTask.dto");
const auth_dto_1 = require("./dto/auth.dto");
const tasks_enum_1 = require("./tasks.enum");
const tasksFilter_dto_1 = require("./dto/tasksFilter.dto");
const taskStatusValidation_pipe_1 = require("./pipes/taskStatusValidation.pipe");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    getTasks(filterDto) {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilter(filterDto);
        }
        else {
            return this.tasksService.getTasks();
        }
    }
    async createTask(createTaskDto) {
        return await this.tasksService.createTasks(createTaskDto);
    }
    getTaskById(id) {
        return this.tasksService.getTaskById(id);
    }
    deleteTaskById(id) {
        return this.tasksService.deleteTaskById(id);
    }
    updateTaskStatus(id, status) {
        return this.tasksService.updateTaskStatus(id, status);
    }
    addUser(auth) {
        return this.tasksService.addUser(auth);
    }
    loginUser(auth) {
        return this.tasksService.signIn(auth);
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Get)('tasks'),
    __param(0, (0, common_1.Query)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tasksFilter_dto_1.GetTasksFilterDto]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getTasks", null);
__decorate([
    (0, common_1.Post)('tasks'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createTask_dto_1.createTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    (0, common_1.Get)('tasks/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getTaskById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "deleteTaskById", null);
__decorate([
    (0, common_1.Patch)('tasks/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status', taskStatusValidation_pipe_1.TaskStatusValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "updateTaskStatus", null);
__decorate([
    (0, common_1.Post)('auth/signup'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.createAuthDto]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "addUser", null);
__decorate([
    (0, common_1.Post)('auth/signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "loginUser", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map