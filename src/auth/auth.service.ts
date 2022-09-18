import { IUserService } from './../users/users';
import { IAuthService } from './auth';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { validateUserDetails } from 'src/utils/types';
import { compareHash } from 'src/utils/helpers';

@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject(Services.USERS) private userService: IUserService) {}

  async validateUser(userCredentials: validateUserDetails) {
    const user = await this.userService.findUser({
      email: userCredentials.email,
    });

    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await compareHash(
      userCredentials.password,
      user.password,
    );

    return isPasswordValid ? user : null;
  }
}
