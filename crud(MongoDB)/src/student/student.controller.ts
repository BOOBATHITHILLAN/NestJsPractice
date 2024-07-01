import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentDTO } from './dto/student.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  async getStudent() {
    return await this.studentService.getStudents();
  }

  @Get(':id')
  async getOneStudent(@Param('id') id: string) {
    return await this.studentService.getOneStudent(id);
  }

  @Post()
  async createStudent(@Body() data: StudentDTO) {
    return await this.studentService.createStudent(data);
  }

  @Put(':id')
  async updateOneStudent(@Param('id') id: string, @Body() data: StudentDTO) {
    return await this.studentService.updateOneStudent(id, data);
  }

  @Patch(':id')
  async patchOneStudent(@Param('id') id: string, @Body() data: any) {
    return await this.studentService.patchOneStudent(id, data);
  }

  @Delete(':id')
  async deleteOneStudent(@Param('id') id: string) {
    return await this.studentService.deleteOneStudent(id);
  }
}
