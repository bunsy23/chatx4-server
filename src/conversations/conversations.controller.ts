import { CreateConversationDto } from './dto/createConversation.dto';
import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import { Routes, Services } from 'src/utils/constants';
import { IConversationService } from './conversations';

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticatedGuard)
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationsService: IConversationService,
  ) {}

  @Post()
  createConversation(@Body() createConversationPayload: CreateConversationDto) {
    console.log({ createConversationPayload });

    this.conversationsService.createConversation(createConversationPayload);
  }
}
