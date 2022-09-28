import { CreateMessageDto } from './dto/createMessage.dto';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IMessageService } from './message';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller(Routes.MESSAGES)
@UseGuards(AuthenticatedGuard)
export class MessagesController {
  constructor(
    @Inject(Services.MESSAGES)
    private readonly messagesService: IMessageService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async createMessage(
    @AuthUser() user: User,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    const message = await this.messagesService.createMessage({
      ...createMessageDto,
      user,
    });
    this.eventEmitter.emit('message.create', message);
    return;
  }

  @Get(':id')
  getMessagesByConversationId(
    @AuthUser() user: User,
    @Param('id') conversationId: number,
  ) {
    return this.messagesService.getMessagesByConversationId(
      user,
      conversationId,
    );
  }
}
