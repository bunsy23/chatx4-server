import { IUserService } from './users';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createUserDetails } from 'src/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/utils/helpers';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDetails: createUserDetails) {
    const existingUser = await this.userRepository.findOneBy({
      email: userDetails.email,
    });

    if (existingUser) {
      throw new HttpException('User Already Exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await hashPassword(userDetails.password);
    const newUser = this.userRepository.create({
      ...userDetails,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }
}
