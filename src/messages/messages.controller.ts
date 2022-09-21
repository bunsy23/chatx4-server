import { CreateMessageDto } from './dto/createMessage.dto';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IMessageService } from './message';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';

@Controller(Routes.MESSAGES)
@UseGuards(AuthenticatedGuard)
export class MessagesController {
  constructor(
    @Inject(Services.MESSAGES)
    private readonly messagesService: IMessageService,
  ) {}

  @Post()
  createMessage(
    @AuthUser() user: User,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.messagesService.createMessage({ ...createMessageDto, user });
  }
}
