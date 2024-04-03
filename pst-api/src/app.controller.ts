import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-guard';
import { AgentsJwtGuard } from './auth/agents-jwt-guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  getProfile(
    @Req()
    request
  ) {
    return request.user;
  }

  @Get('my-estates')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AgentsJwtGuard)
  getMyEstates(
    @Req()
    request
  ) {
    console.log('my-estates', request.user);
    return { estates: [{ name: 'Estate 1' }] };
  }
}
