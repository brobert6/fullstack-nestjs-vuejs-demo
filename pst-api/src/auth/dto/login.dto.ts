import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'test5@yahoo.com',
    description: 'Email for login',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '1234567',
    description: 'Password',
  })
  password: string;
}
