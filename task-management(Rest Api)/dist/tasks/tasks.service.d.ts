import { Task, TaskStatus } from './task.model';
import { createTaskDto } from './dto/createTask.dto';
import { GetTasksFilterDto } from './dto/tasksFilter.dto';
export declare class TasksService {
    private tasks;
    getAllTasks(): Task[];
    getTasksWithFilter(filterDto: GetTasksFilterDto): Task[];
    createTask(createTaskDto: createTaskDto): Task;
    getTaskById(id: string): Task;
    deleteTaskById(id: string): string;
    updateTaskStatus(id: string, status: TaskStatus): Task;
}
