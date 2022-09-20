import { ParticipantsService } from './../participants/participants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { Conversation, Participant, User } from 'src/utils/typeorm';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Participant, User])],
  controllers: [ConversationsController],
  providers: [
    { provide: Services.CONVERSATIONS, useClass: ConversationsService },
    { provide: Services.PARTICIPANTS, useClass: ParticipantsService },
    { provide: Services.USERS, useClass: UsersService },
  ],
})
export class ConversationsModule {}
