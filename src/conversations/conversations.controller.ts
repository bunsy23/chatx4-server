import { CreateConversationDto } from './dto/createConversation.dto';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import { Routes, Services } from 'src/utils/constants';
import { IConversationService } from './conversations';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticatedGuard)
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSATIONS)
    private readonly conversationsService: IConversationService,
  ) {}

  @Post()
  async createConversation(
    @AuthUser() user: User,
    @Body() createConversationPayload: CreateConversationDto,
  ) {
    return this.conversationsService.createConversation(
      user,
      createConversationPayload,
    );
  }

  @Get()
  async getConversation(@AuthUser() { id: userId }: User) {
    return this.conversationsService.getConversations(userId);
  }

  @Get(':id')
  async getConversationByID(@Param('id') conversationId: number) {
    const conversation =
      this.conversationsService.findConversationById(conversationId);

    return conversation;
  }
}
