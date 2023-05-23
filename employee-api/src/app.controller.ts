import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  HttpCode,
  Put,
} from '@nestjs/common';
import {
  InMemoryDBEntity,
  InMemoryDBService,
} from '@nestjs-addons/in-memory-db';

interface EmployeeEntity extends InMemoryDBEntity {
  dob: string;
  email: string;
  firstName: string;
  lastName: string;
}
@Controller()
export class AppController {
  constructor(
    private readonly employeeService: InMemoryDBService<EmployeeEntity>,
  ) {
    employeeService.create({
      firstName: 'Razvan',
      lastName: 'Vancea',
      dob: '05-05-1994',
      email: 'iamqarv@gmail.com',
    });
    employeeService.create({
      firstName: 'Tudor',
      lastName: 'Gogh',
      dob: '23-04-1995',
      email: 'tudor.gogh@gmail.com',
    });
  }

  @Get('/api/employees')
  getAllEmployees(): EmployeeEntity[] {
    return this.employeeService.getAll();
  }

  @Get('/api/employees/:id')
  @HttpCode(200)
  getEmployeeById(@Param('id') id: string): EmployeeEntity {
    return this.employeeService.get(id);
  }

  @Delete('/api/employees/:id')
  @HttpCode(204)
  deleteById(@Param('id') id: string) {
    return this.employeeService.delete(id);
  }

  @Post('/api/employees')
  @HttpCode(201)
  createEmployee(@Body() newEmployee: EmployeeEntity): EmployeeEntity {
    return this.employeeService.create(newEmployee);
  }

  @Put('/api/employees/:id')
  @HttpCode(204)
  updateEmployee(
    @Param('id') id: string,
    @Body() updateEmployee: EmployeeEntity,
  ) {
    updateEmployee.id = id;
    return this.employeeService.update(updateEmployee);
  }
}
