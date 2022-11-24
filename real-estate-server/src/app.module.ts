import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './categories/category.module';
import { ChatBotModule } from './chat-bots/chat-bot.module';
import { DatabaseConfig } from './config/database.config';
import { ConnectionModule } from './connection/connection.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';
import { NotificationModule } from './notification/notification.module';
import { PictureModule } from './pictures/picture.module';
import { routes } from './routes';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DatabaseConfig,
    RouterModule.forRoutes(routes),
    AuthModule,
    UserModule,
    MailSenderModule,
    ConnectionModule,
    NotificationModule,
    CategoryModule,
    ChatBotModule,
    PictureModule,
  ],

  providers: [],
})
export class AppModule {}
