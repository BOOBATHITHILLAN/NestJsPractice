import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/createTask.dto';
import { createAuthDto } from './dto/auth.dto';
import { TaskStatus } from './tasks.enum';
import { GetTasksFilterDto } from './dto/tasksFilter.dto';
import { TaskStatusValidationPipe } from './pipes/taskStatusValidation.pipe';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('tasks')
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto) {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilter(filterDto);
    } else {
      return this.tasksService.getTasks();
    }
  }

  // @MessagePattern({cmd:'get'})
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto) {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilter(filterDto);
  //   } else {
  //     return this.tasksService.getTasks();
  //   }
  // }

  @Post('tasks')
  @UsePipes(ValidationPipe)
  async createTask(@Body() createTaskDto: createTaskDto) {
    return await this.tasksService.createTasks(createTaskDto);
  }

  @Get('tasks/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: string) {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('tasks/:id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ) {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Post('auth/signup')
  @UsePipes(ValidationPipe)
  addUser(@Body() auth: createAuthDto) {
    return this.tasksService.addUser(auth);
  }

  @Post('auth/signin')
  loginUser(@Body() auth: any) {
    return this.tasksService.signIn(auth);
  }
}
