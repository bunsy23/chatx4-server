import { IoAdapter } from '@nestjs/platform-socket.io';
import { getRepository } from 'typeorm';
import * as Cookie from 'cookie';
import * as CookieParser from 'cookie-parser';
import { plainToClass } from 'class-transformer';
import { ServerOptions } from 'socket.io';

import { Session, User } from 'src/utils/typeorm';
import { AuthenticatedSocket } from 'src/utils/interfaces';

export class WebsocketAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions) {
    const sessionRepository = getRepository(Session);
    const server = super.createIOServer(port, options);
    server.use(async (socket: AuthenticatedSocket, next) => {
      const { cookie: clientCookie } = socket.handshake.headers;
      if (!clientCookie) {
        console.log('Client has no cookie.');
        return next(new Error('Not Authenticated.'));
      }

      const { CHAT_X4_SESSION_ID } = Cookie.parse(clientCookie);
      if (!CHAT_X4_SESSION_ID) {
        console.log('CHAT_X4_SESSION_ID does not exist.');
        return next(new Error('Not Authenticated.'));
      }

      const signedCookie = CookieParser.signedCookie(
        CHAT_X4_SESSION_ID,
        process.env.COOKIE_SECRET,
      );
      if (!signedCookie) {
        return next(new Error('Error signed cookie.'));
      }

      const sessionDB = await sessionRepository.findOne({ id: signedCookie });
      const userDB = plainToClass(
        User,
        JSON.parse(sessionDB.json).passport.user,
      );

      //   console.log({
      //     clientCookie,
      //     CHAT_X4_SESSION_ID,
      //     signedCookie,
      //     sessionDB,
      //     userDB,
      //   });

      socket.user = userDB;
      next();
    });

    return server;
  }
}
