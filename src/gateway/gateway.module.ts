import { MessagingGateway } from './gateway';
import { Module } from '@nestjs/common';

@Module({ providers: [MessagingGateway] })
export class GatewayModule {}
