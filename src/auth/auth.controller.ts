import { AuthenticatedGuard, LocalAuthGuard } from './utils/Guards';
import { CreateUserDto } from './dtos/createUser.dto';
import { Routes, Services } from '../utils/constants';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { IAuthService } from './auth';
import { IUserService } from 'src/users/users';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';

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
  login(@Res() res: Response) {
    return res.sendStatus(HttpStatus.OK);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  status(@Req() req: Request, @Res() res: Response) {
    res.send(req.user);
  }

  @Post('logout')
  logout() {}
}
