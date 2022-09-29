import { OnEvent } from '@nestjs/event-emitter';
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthenticatedSocket } from 'src/utils/interfaces';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:5173'],
    credentials: true,
  },
})
export class MessagingGateway implements OnGatewayConnection {
  handleConnection(socket: AuthenticatedSocket, ...args: any[]) {
    // console.log({ socket });
    socket.emit('connected', { status: 'connected' });
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {
    // console.log('handleCreateMessage', { data });
  }

  @OnEvent('message.create')
  handleMessageCreateEvent(payload: any) {
    // console.log('message.create > handleMessageCreateEvent', payload);
    this.server.emit('onMessage', payload);
  }
}
