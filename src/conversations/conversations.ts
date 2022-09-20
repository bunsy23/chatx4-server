import { Conversation, User } from 'src/utils/typeorm';
import { CreateConversationParams } from './../utils/types';
export interface IConversationService {
  createConversation(
    user: User,
    conversationParams: CreateConversationParams,
  ): Promise<Conversation>;

  getConversations(userId: number): Promise<Conversation[]>;
  findConversationById(conversationId: number): Promise<Conversation>;
}
