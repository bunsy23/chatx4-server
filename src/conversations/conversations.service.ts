import { Inject, Injectable } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { IConversationService } from './conversations';

@Injectable()
export class ConversationsService implements IConversationService {
  createConversation() {}
}
