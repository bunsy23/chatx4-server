import { IUserService } from './../users/users';
import { IAuthService } from './auth';
import { Inject, Injectable } from '@nestjs/common';
import { Services } from 'src/utils/constants';

@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject(Services.USERS) private userService: IUserService) {}
  validateUser() {}
}
