import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './interface/student.interface';
import { StudentDTO } from './dto/student.dto';

@Injectable()
export class StudentService {
    constructor(@InjectModel("Student") private StudentModel: Model<Student>) { }
    async getStudents() {
        return await this.StudentModel.find()
    }

    async createStudent(data: StudentDTO) {
        const student = new this.StudentModel(data);
        return await student.save();
    }

    async getOneStudent(id: string) {
        return await this.StudentModel.findById(id);
    }

    async updateOneStudent(id: string, data: StudentDTO) {
        return await this.StudentModel.findOneAndUpdate({ _id: id }, data);
    }

    async patchOneStudent(id: string, data: any) {
        return await this.StudentModel.findOneAndUpdate({ _id: id }, data, { new: true });
    }

    async deleteOneStudent(id: string) {
        return await this.StudentModel.findOneAndDelete({ _id: id })
    }


}
