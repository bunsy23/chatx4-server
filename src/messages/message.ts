import { Message, User } from 'src/utils/typeorm';
import { CreateMessageParams } from 'src/utils/types';

export interface IMessageService {
  createMessage(params: CreateMessageParams): Promise<Message>;
  getMessagesByConversationId(
    user: User,
    conversationId: number,
  ): Promise<Message[]>;
}
