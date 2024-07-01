import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task } from './task.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createTaskDto } from './dto/createTask.dto';
import { TaskStatus } from './tasks.enum';
import { GetTasksFilterDto } from './dto/tasksFilter.dto';
import { Auth } from './auth.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TasksService {
  
  constructor(
    @InjectModel('Task') private TaskModel: Model<Task>,
    @InjectModel('Auth') private AuthModel: Model<Auth>,
    private jwtService: JwtService,
  ) {}

  getTasks() {
    return this.TaskModel.find();
  }

  async createTasks(createTaskDto: createTaskDto) {
    const { title, description } = createTaskDto;

    const task: any = new this.TaskModel({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    return await task.save();
  }

  async getTaskById(id: string) {
    const task = await this.TaskModel.findById({ _id: id });
    if (task) {
      return task;
    }
    throw new NotFoundException(`Task with given ID is not found`);
  }

  async getTasksWithFilter(filterDto: GetTasksFilterDto) {
    const { status, search } = filterDto;
    const allTasks = await this.TaskModel.find();
    let tasks = [...allTasks];
    if (status) {
      tasks = tasks.filter((task) =>
        task.status.includes(status.toUpperCase()),
      );
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }

  async deleteTaskById(id: string) {
    const task = await this.TaskModel.findById({ _id: id });
    if (task) {
      const deletedTask = await this.TaskModel.findOneAndDelete({ _id: id });
      return { taskDeleted: deletedTask };
    } else {
      throw new NotFoundException('Requested - Task not available');
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus) {
    const task = await this.TaskModel.findById({ _id: id });
    if (task) {
      await this.TaskModel.findOneAndUpdate({ _id: id }, { status: status });
      const updatedTask = await this.TaskModel.findOne({ _id: id });
      return { taskUpdated: updatedTask };
    } else {
      throw new NotFoundException(
        'Status should be "DONE" or "IN_PROGRESS" or "OPEN"',
      );
    }
  }

  async addUser(auth: any) {
    const user = await this.AuthModel.findOne({ email: auth.email });
    if (user) {
      throw new BadRequestException('User exist');
    } else {
      const newUser = new this.AuthModel(auth);
      return newUser.save();
    }
  }

  async signIn(data: any) {
    const { email, password } = data;
    const userExist = await this.AuthModel.findOne({ email: email });
    if (!userExist) {
      throw new BadRequestException('Invalid credentials');
    }
    if (userExist.password === password) {
      const token = await this.jwtService.signAsync({ userId: userExist._id });
      return { token: token };
    }

    throw new BadRequestException('Invalid credentials');
  }
}
