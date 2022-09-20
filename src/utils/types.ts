import { Request } from '@nestjs/common';
import { User } from './typeorm';

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
  recipientId: number;
  message: string;
};

export type FindParticipantParams = Partial<{
  id: number;
}>;

export type CreateParticipantParams = { id: number };

export interface AuthenticatedRequest extends Request {
  user: User;
}
