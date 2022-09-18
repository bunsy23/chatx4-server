import { SessionSerializer } from './utils/SessionSerializer';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/LocalStrategy';
import { Services } from '../utils/constants';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    SessionSerializer,
    { provide: Services.AUTH, useClass: AuthService },
  ],
})
export class AuthModule {}
