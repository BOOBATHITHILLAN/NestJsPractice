import { PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../tasks.enum";
export declare class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatus: TaskStatus[];
    transform(value: any): any;
    private isStatusValid;
}
