import { AuthenticatedSocket } from './../utils/interfaces';
import { Injectable } from '@nestjs/common';

export interface GatewaySessionManagerImp {
  getSocket(userId: number): AuthenticatedSocket;
  getSockets(): Map<number, AuthenticatedSocket>;
  setUserSocket(userId: number, socket: AuthenticatedSocket): void;
  removeUserSocket(userId: number): void;
}

@Injectable()
export class GateWaySessionManager implements GatewaySessionManagerImp {
  private readonly sessions: Map<number, AuthenticatedSocket> = new Map();

  getSocket(userId: number): AuthenticatedSocket {
    return this.sessions.get(userId);
  }

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
