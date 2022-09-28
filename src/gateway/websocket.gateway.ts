import { OnEvent } from '@nestjs/event-emitter';
import {
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: ['http://localhost:5173'] } })
export class MessagingGateway implements OnGatewayInit {
  handleConnection(client: Socket, ...args: any[]) {
    console.log('New incoming connection', { client });
    client.emit('connected', { status: 'connected' });
  }

  afterInit(server: any) {
    console.log({ server });
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {
    console.log('handleCreateMessage', { data });
  }

  @OnEvent('message.create')
  handleMessageCreateEvent(payload: any) {
    console.log('message.create > handleMessageCreateEvent', payload);
    this.server.emit('onMessage', payload);
  }
}
