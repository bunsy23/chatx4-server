import { instanceToPlain } from 'class-transformer';
import { CreateMessageParams } from 'src/utils/types';
import { IMessageService } from './message';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Conversation, Message, User } from 'src/utils/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService implements IMessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async createMessage({
    user,
    conversationId,
    content,
  }: CreateMessageParams): Promise<Message> {
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
      relations: ['creator', 'recipient'],
    });

    if (!conversation) {
      throw new HttpException('Conversation Not Found', HttpStatus.BAD_REQUEST);
    }

    const { creator, recipient } = conversation;
    console.log(
      { creator, recipient, user },
      creator.id !== user.id || recipient.id !== user.id,
    );

    if (creator.id !== user.id && recipient.id !== user.id) {
      throw new HttpException('Cannot Create Message', HttpStatus.FORBIDDEN);
    }

    // conversation.creator = instanceToPlain(conversation.creator) as User;
    // conversation.recipient = instanceToPlain(conversation.recipient) as User;

    const newMessage = await this.messageRepository.create({
      content: content,
      conversation: conversation,
      author: instanceToPlain(user),
    });

    const savedMessage = await this.messageRepository.save(newMessage);
    conversation.lastMessageSent = savedMessage;
    await this.conversationRepository.save(conversation);
    return;
  }

  async getMessagesByConversationId(
    user: User,
    conversationId: number,
  ): Promise<Message[]> {
    return this.messageRepository.find({
      where: { conversation: { id: conversationId } },
      order: { createdAt: 'DESC' },
      relations: ['author'],
    });
  }
}
