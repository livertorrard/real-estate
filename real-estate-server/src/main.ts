import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as requestIp from 'request-ip';
import { AppModule } from './app.module';
import { env } from './config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix(env.APP_PREFIX);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();

  app.use(requestIp.mw());
  app.use(helmet());
  app.use(compression());

  // Rate limiting against brute-force attacks
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 500, // limit each IP to 500 requests per windowMs
      message: 'Too many requests from this IP, please try again later',
      keyGenerator: (req) => requestIp.getClientIp(req),
    }),
  );

  const signupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 10, // start blocking after 10 requests
    message:
      'Too many accounts created from this IP, please try again after an hour',
    keyGenerator: (req) => requestIp.getClientIp(req),
  });
  app.use('/auth/signup', signupLimiter);

  // Swagger API Documentation
  const options = new DocumentBuilder()
    .setTitle('Real-Estate API Documentation')
    .setVersion('0.0.1')
    .addTag('auth')
    .addTag('connection')
    .addTag('notification')
    .addTag('user')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);

  await app.listen(env.APP_PORT, () => {
    console.log(`Server listening on port ${env.APP_PORT}`);
  });
}

bootstrap()
  .then(() => console.log('Init app successfully'))
  .catch(console.error);
