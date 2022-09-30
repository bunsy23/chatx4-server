import { CreateMessageResponse } from './../utils/types';
import { Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Services } from 'src/utils/constants';
import { AuthenticatedSocket } from 'src/utils/interfaces';
import { Conversation } from 'src/utils/typeorm';
import { GatewaySessionManagerImp } from './gateway.session';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173'],
    credentials: true,
  },
})
export class MessagingGateway implements OnGatewayConnection {
  constructor(
    @Inject(Services.GATEWAY_SESSION_MANAGER)
    private readonly gatewaySessionManager: GatewaySessionManagerImp,
  ) {}

  handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
    this.gatewaySessionManager.setUserSocket(socket.user.id, socket);

    socket.join('some room');
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {
    // console.log('handleCreateMessage', { data });
  }

  @SubscribeMessage('onUserTyping')
  handleUserTyping(@MessageBody() data: any) {
    console.log({ data });
  }

  @OnEvent('message.create')
  handleMessageCreateEvent(payload: CreateMessageResponse) {
    console.log('message.create > handleMessageCreateEvent', payload);
    const {
      author,
      conversation: { creator, recipient },
    } = payload.message;

    const authorSocket = this.gatewaySessionManager.getSocket(author.id);
    const recipientSocket =
      author.id === creator.id
        ? this.gatewaySessionManager.getSocket(recipient.id)
        : this.gatewaySessionManager.getSocket(creator.id);

    if (authorSocket) authorSocket.emit('onMessage', payload);
    if (recipientSocket) recipientSocket.emit('onMessage', payload);
  }

  @OnEvent('conversation.create')
  handleConversationCreateEvent(payload: Conversation) {
    console.log('conversation.create', { payload });

    const recipientSocket = this.gatewaySessionManager.getSocket(
      payload.recipient.id,
    );

    if (recipientSocket) recipientSocket.emit('onConversation', payload);
  }
}
