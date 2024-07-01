/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Task } from './task.interface';
import { Model } from 'mongoose';
import { createTaskDto } from './dto/createTask.dto';
import { TaskStatus } from './tasks.enum';
import { GetTasksFilterDto } from './dto/tasksFilter.dto';
import { Auth } from './auth.interface';
import { JwtService } from '@nestjs/jwt';
export declare class TasksService {
    private TaskModel;
    private AuthModel;
    private jwtService;
    constructor(TaskModel: Model<Task>, AuthModel: Model<Auth>, jwtService: JwtService);
    getTasks(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Task> & Task & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, {}, Task> & Task & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Task, "find">;
    createTasks(createTaskDto: createTaskDto): Promise<any>;
    getTaskById(id: string): Promise<import("mongoose").Document<unknown, {}, Task> & Task & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getTasksWithFilter(filterDto: GetTasksFilterDto): Promise<(import("mongoose").Document<unknown, {}, Task> & Task & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    deleteTaskById(id: string): Promise<{
        taskDeleted: import("mongoose").Document<unknown, {}, Task> & Task & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updateTaskStatus(id: string, status: TaskStatus): Promise<{
        taskUpdated: import("mongoose").Document<unknown, {}, Task> & Task & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    addUser(auth: any): Promise<import("mongoose").Document<unknown, {}, Auth> & Auth & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    signIn(data: any): Promise<{
        token: string;
    }>;
}
