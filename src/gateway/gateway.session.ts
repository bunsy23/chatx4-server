import { AuthenticatedSocket } from './../utils/interfaces';
import { Injectable } from '@nestjs/common';

export interface GatewaySessionImp {
  getSocket(id: number);
}

@Injectable()
export class GateWaySessionManager implements GatewaySessionImp {
  private readonly sessions: Map<number, AuthenticatedSocket> = new Map();

  getSocket(id: number) {}

  getSockets(): Map<number, AuthenticatedSocket> {
    return this.sessions;
  }

  setUserSocket(userId: number, socket: AuthenticatedSocket) {
    this.sessions.set(userId, socket);
  }

  removeUserSocket(userId: number) {
    this.sessions.delete(userId);
  }
}
