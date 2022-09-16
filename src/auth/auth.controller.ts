import { CreateUserDto } from './dtos/createUser.dto';
import { Routes, Services } from './../utils/types';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IAuthService } from './auth';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(Services.AUTH) private authService: IAuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
  }

  @Post('login')
  login() {}

  @Get('status')
  status() {}

  @Post('logout')
  logout() {}
}
