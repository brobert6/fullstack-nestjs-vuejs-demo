import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PayloadType } from './types';
import { AgentService } from 'src/agent/agent.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private agentService: AgentService
  ) {}

  async login(loginDTO: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findOneByLogin(loginDTO);

    const passwordMatched = await bcrypt.compare(loginDTO.password, user.password);

    if (passwordMatched) {
      delete user.password;
      const payload: PayloadType = { email: user.email, userId: user.id };

      const agent = await this.agentService.findAgent(user.id);
      if (agent) {
        payload.agentId = agent.id;
      }

      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Password does not match');
    }
  }
}
