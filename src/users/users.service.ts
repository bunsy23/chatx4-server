import { IUserService } from './users';
import { Injectable } from '@nestjs/common';
import { createUserDetails } from 'src/utils/types';

@Injectable()
export class UsersService implements IUserService {
  createUser(userDetails: createUserDetails) {
    console.log('createUser');
  }
}
