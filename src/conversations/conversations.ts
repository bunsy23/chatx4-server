import { CreateConversationParams } from './../utils/types';
export interface IConversationService {
  createConversation(createConversationParams: CreateConversationParams);
}
