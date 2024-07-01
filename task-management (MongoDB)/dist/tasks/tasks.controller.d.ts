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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/createTask.dto';
import { createAuthDto } from './dto/auth.dto';
import { TaskStatus } from './tasks.enum';
import { GetTasksFilterDto } from './dto/tasksFilter.dto';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getTasks(filterDto: GetTasksFilterDto): Promise<(import("mongoose").Document<unknown, {}, import("./task.interface").Task> & import("./task.interface").Task & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    createTask(createTaskDto: createTaskDto): Promise<any>;
    getTaskById(id: string): Promise<import("mongoose").Document<unknown, {}, import("./task.interface").Task> & import("./task.interface").Task & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteTaskById(id: string): Promise<{
        taskDeleted: import("mongoose").Document<unknown, {}, import("./task.interface").Task> & import("./task.interface").Task & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updateTaskStatus(id: string, status: TaskStatus): Promise<{
        taskUpdated: import("mongoose").Document<unknown, {}, import("./task.interface").Task> & import("./task.interface").Task & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    addUser(auth: createAuthDto): Promise<import("mongoose").Document<unknown, {}, import("./auth.interface").Auth> & import("./auth.interface").Auth & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    loginUser(auth: any): Promise<{
        token: string;
    }>;
}
