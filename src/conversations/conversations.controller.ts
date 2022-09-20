import { CreateConversationDto } from './dto/createConversation.dto';
import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import { Routes, Services } from 'src/utils/constants';
import { IConversationService } from './conversations';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { IUserService } from 'src/users/users';

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
    // const userDB = await this.usersService.findUser({ id: user.id });
    // console.log(userDB);

    console.log({ user, createConversationPayload });

    return this.conversationsService.createConversation(
      user,
      createConversationPayload,
    );
  }
}
