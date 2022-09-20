import { CreateConversationParams } from './../utils/types';
import { Inject, Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { IConversationService } from './conversations';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, User, Participant } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { Services } from 'src/utils/constants';
import { IParticipantsService } from 'src/participants/participant';
import { IUserService } from 'src/users/users';

@Injectable()
export class ConversationsService implements IConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @Inject(Services.PARTICIPANTS)
    private readonly participantsService: IParticipantsService,
    @Inject(Services.USERS) private readonly usersService: IUserService,
  ) {}

  async createConversation(
    user: User,
    createConversationParams: CreateConversationParams,
  ) {
    const { authorId, recipientId } = createConversationParams;
    const participants: Participant[] = [];

    const userDB = await this.usersService.findUser({
      id: user.id,
    });

    if (!userDB.participant) {
      const participantAuthor = await this.createParticipantAndSaveUser(
        userDB,
        authorId,
      );
      participants.push(participantAuthor);
    } else {
      participants.push(userDB.participant);
    }

    const recipient = await this.usersService.findUser({
      id: recipientId,
    });

    if (!recipient) {
      throw new HttpException('Recipient Not Found', HttpStatus.BAD_REQUEST);
    }

    if (!recipient.participant) {
      const participantRecipient = await this.createParticipantAndSaveUser(
        recipient,
        recipientId,
      );
      participants.push(participantRecipient);
    } else {
      participants.push(recipient.participant);
    }

    const newConversation = await this.conversationRepository.create({
      participants,
    });

    return this.conversationRepository.save(newConversation);
  }

  private async createParticipantAndSaveUser(user: User, id: number) {
    const newParticipant = await this.participantsService.createParticipant({
      id,
    });
    user.participant = newParticipant;
    await this.usersService.saveUser(user);
    return newParticipant;
  }
}
