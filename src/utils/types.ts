import { Request } from '@nestjs/common';
import { Conversation, Message, User } from './typeorm';

export type createUserDetails = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type validateUserDetails = {
  email: string;
  password: string;
};

export type FindUserParams = Partial<{
  id: number;
  email: string;
}>;

export type CreateConversationParams = {
  email: string;
  message: string;
};

export type FindParticipantParams = Partial<{
  id: number;
}>;

export type CreateParticipantParams = { id: number };

export interface AuthenticatedRequest extends Request {
  user: User;
}

export type CreateMessageParams = {
  content: string;
  conversationId: number;
  user: User;
};

export type CreateMessageResponse = {
  message: Message;
  conversation: Conversation;
};
