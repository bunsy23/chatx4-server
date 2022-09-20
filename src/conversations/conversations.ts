import { User } from 'src/utils/typeorm';
import { CreateConversationParams } from './../utils/types';
export interface IConversationService {
  createConversation(
    user: User,
    createConversationParams: CreateConversationParams,
  );
}
