import { Length } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateAgentDto {
  @Length(5, 100)
  name: string;

  description: string;

  logo: string;

  user: User;
}
