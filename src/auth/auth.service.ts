import { IAuthService } from './auth';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService implements IAuthService {
  validateUser() {}
}
