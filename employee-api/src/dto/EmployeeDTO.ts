import { IsEmail, IsNotEmpty, IsString, isString } from 'class-validator';

export class EmployeeDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsString()
  dob: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
