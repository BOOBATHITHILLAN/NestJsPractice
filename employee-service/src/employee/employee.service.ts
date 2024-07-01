import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {

    private employees=[];

    getAllEmployees()
    {
        return this.employees;
    }


}
