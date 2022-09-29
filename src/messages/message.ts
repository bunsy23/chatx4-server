import { CreateMessageResponse } from './../utils/types';
import { Message, User } from 'src/utils/typeorm';
import { CreateMessageParams } from 'src/utils/types';

export interface IMessageService {
  createMessage(params: CreateMessageParams): Promise<CreateMessageResponse>;
  getMessagesByConversationId(
    user: User,
    conversationId: number,
  ): Promise<Message[]>;
}
