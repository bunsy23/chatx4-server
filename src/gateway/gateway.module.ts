import { MessagingGateway } from './websocket.gateway';
import { Module } from '@nestjs/common';

@Module({ providers: [MessagingGateway] })
export class GatewayModule {}
