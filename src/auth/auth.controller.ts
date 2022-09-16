import { Routes, Services } from './../utils/types';
import { Controller, Inject } from '@nestjs/common';
import { IAuthService } from './auth';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(Services.AUTH) private authService: IAuthService) {}
}
