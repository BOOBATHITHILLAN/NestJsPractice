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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tasks_enum_1 = require("./tasks.enum");
const jwt_1 = require("@nestjs/jwt");
let TasksService = class TasksService {
    constructor(TaskModel, AuthModel, jwtService) {
        this.TaskModel = TaskModel;
        this.AuthModel = AuthModel;
        this.jwtService = jwtService;
    }
    getTasks() {
        return this.TaskModel.find();
    }
    async createTasks(createTaskDto) {
        const { title, description } = createTaskDto;
        const task = new this.TaskModel({
            title,
            description,
            status: tasks_enum_1.TaskStatus.OPEN,
        });
        return await task.save();
    }
    async getTaskById(id) {
        const task = await this.TaskModel.findById({ _id: id });
        if (task) {
            return task;
        }
        throw new common_1.NotFoundException(`Task with given ID is not found`);
    }
    async getTasksWithFilter(filterDto) {
        const { status, search } = filterDto;
        const allTasks = await this.TaskModel.find();
        let tasks = [...allTasks];
        if (status) {
            tasks = tasks.filter((task) => task.status.includes(status.toUpperCase()));
        }
        if (search) {
            tasks = tasks.filter((task) => task.title.includes(search) || task.description.includes(search));
        }
        return tasks;
    }
    async deleteTaskById(id) {
        const task = await this.TaskModel.findById({ _id: id });
        if (task) {
            const deletedTask = await this.TaskModel.findOneAndDelete({ _id: id });
            return { taskDeleted: deletedTask };
        }
        else {
            throw new common_1.NotFoundException('Requested - Task not available');
        }
    }
    async updateTaskStatus(id, status) {
        const task = await this.TaskModel.findById({ _id: id });
        if (task) {
            await this.TaskModel.findOneAndUpdate({ _id: id }, { status: status });
            const updatedTask = await this.TaskModel.findOne({ _id: id });
            return { taskUpdated: updatedTask };
        }
        else {
            throw new common_1.NotFoundException('Status should be "DONE" or "IN_PROGRESS" or "OPEN"');
        }
    }
    async addUser(auth) {
        const user = await this.AuthModel.findOne({ email: auth.email });
        if (user) {
            throw new common_1.BadRequestException('User exist');
        }
        else {
            const newUser = new this.AuthModel(auth);
            return newUser.save();
        }
    }
    async signIn(data) {
        const { email, password } = data;
        const userExist = await this.AuthModel.findOne({ email: email });
        if (!userExist) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        if (userExist.password === password) {
            const token = await this.jwtService.signAsync({ userId: userExist._id });
            return { token: token };
        }
        throw new common_1.BadRequestException('Invalid credentials');
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Task')),
    __param(1, (0, mongoose_1.InjectModel)('Auth')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map