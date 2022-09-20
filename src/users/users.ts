import { User } from 'src/utils/typeorm';
import { createUserDetails, FindUserParams } from 'src/utils/types';

export interface IUserService {
  createUser(userDetail: createUserDetails): Promise<User>;
  findUser(findUserParams: FindUserParams): Promise<User>;
  saveUser(user: User): Promise<User>;
}
