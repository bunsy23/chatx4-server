import { IUserService } from 'src/users/users';
import { Services } from '../../utils/constants';
import { PassportSerializer } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/utils/typeorm';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.USERS) private readonly UsersService: IUserService,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user);
  }

  async deserializeUser(user: User, done: CallableFunction) {
    const userDb = await this.UsersService.findUser({ id: user.id });
    return userDb ? done(null, userDb) : done(null, null);
  }
}
