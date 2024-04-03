import { IsEnum } from 'class-validator';

export class CreateRoleDto {
  @IsEnum(['admin', 'agent', 'user', 'owner'], { message: 'Invalid role' })
  name: 'admin' | 'agent' | 'user' | 'owner';
}
