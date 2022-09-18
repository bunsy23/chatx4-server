import { TypeormStore } from 'connect-typeorm/out';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Session } from './utils/typeorm/index';
import * as passport from 'passport';
import * as session from 'express-session';
import { getRepository } from 'typeorm';

async function bootstrap() {
  const { PORT, COOKIE_SECRET } = process.env;

  const app = await NestFactory.create(AppModule);
  const sessionRepository = getRepository(Session);

  app.setGlobalPrefix('api');
  app.enableCors({ origin: ['http://localhost:5173'], credentials: true });
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      secret: COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // cookie expire in 1 day
      },
      store: new TypeormStore().connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
