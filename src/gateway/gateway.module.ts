import { MessagingGateway } from './gateway';
import { Module } from '@nestjs/common';
import { Services } from 'src/utils/constants';
import { GateWaySessionManager } from './gateway.session';

@Module({
  providers: [
    MessagingGateway,
    {
      provide: Services.GATEWAY_SESSION_MANAGER,
      useClass: GateWaySessionManager,
    },
  ],
})
export class GatewayModule {}
