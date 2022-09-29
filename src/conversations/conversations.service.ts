import { CreateConversationParams } from './../utils/types';
import { Inject, Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { IConversationService } from './conversations';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/users/users';

@Injectable()
export class ConversationsService implements IConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @Inject(Services.USERS) private readonly usersService: IUserService,
  ) {}

  async getConversations(userId: number): Promise<Conversation[]> {
    // console.log({ userId });

    return this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.creator', 'creator')
      .addSelect([
        'creator.id',
        'creator.firstName',
        'creator.lastName',
        'creator.email',
      ])
      .leftJoinAndSelect('conversation.recipient', 'recipient')
      .addSelect([
        'recipient.id',
        'recipient.firstName',
        'recipient.lastName',
        'recipient.email',
      ])
      .where('creator.id = :id', { id: userId })
      .orWhere('recipient.id = :id', { id: userId })
      .orderBy('conversation.id', 'DESC')
      .getMany();
  }

  async findConversationById(conversationId: number): Promise<Conversation> {
    return this.conversationRepository
      .createQueryBuilder('conversation')
      .where('conversation.id = :id', { id: conversationId })
      .leftJoinAndSelect('conversation.creator', 'creators')
      .leftJoinAndSelect('conversation.recipient', 'recipients')
      .leftJoinAndSelect('conversation.messages', 'messages')
      .leftJoinAndSelect('messages.author', 'author')
      .getOne();
  }

  async createConversation(
    user: User,
    conversationParams: CreateConversationParams,
  ) {
    const { recipientId } = conversationParams;

    // handle requestor add him-/herself as the recipient
    if (user.id === conversationParams.recipientId) {
      throw new HttpException(
        'Cannot CREATE Conversation',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingConversation = await this.conversationRepository.findOne({
      where: [
        {
          creator: { id: user.id },
          recipient: { id: recipientId },
        },
        {
          creator: { id: recipientId },
          recipient: { id: user.id },
        },
      ],
    });

    if (existingConversation) {
      throw new HttpException('Conversation Exists', HttpStatus.CONFLICT);
    }

    const recipient = await this.usersService.findUser({
      id: recipientId,
    });

    const newConversation = await this.conversationRepository.create({
      creator: user,
      recipient: recipient,
    });

    return this.conversationRepository.save(newConversation);
  }

  findConversationByParticipants(
    participants: number[],
  ): Promise<Conversation> {
    return this.conversationRepository
      .createQueryBuilder('conversations')
      .leftJoinAndSelect('conversations.participants', 'participants')
      .where('participants.id IN (:...participants)', { participants })
      .getOne();
  }
}
