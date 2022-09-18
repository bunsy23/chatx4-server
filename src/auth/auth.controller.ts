import { LocalAuthGuard } from './utils/Guards';
import { CreateUserDto } from './dtos/createUser.dto';
import { Routes, Services } from '../utils/constants';
import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { IAuthService } from './auth';
import { IUserService } from 'src/users/users';
import { instanceToPlain } from 'class-transformer';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USERS) private userService: IUserService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return instanceToPlain(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login() {
    console.log('login');
  }

  @Get('status')
  status() {}

  @Post('logout')
  logout() {}
}
