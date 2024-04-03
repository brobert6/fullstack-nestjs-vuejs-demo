import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsBoolean, IsString } from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @MinLength(5, { message: 'Zip code must be at least 5 characters long' })
  @MaxLength(10, { message: 'Zip code must be less than 10 characters long' })
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsBoolean({ message: 'Active must be a boolean value' })
  active: boolean;

  roles: CreateRoleDto[];
}
