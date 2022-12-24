import { Module } from '@nestjs/common';
import { ActionModule } from './actions/action.module';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './authors/author.module';
import { CategoryModule } from './categories/category.module';
import { ChatBotModule } from './chat-bots/chat-bot.module';
import { DatabaseConfig } from './config/database.config';
import { PictureModule } from './pictures/picture.module';
import { PostModule } from './posts/post.module';
import { ProductModule } from './products/product.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    DatabaseConfig,
    AuthModule,
    UserModule,
    CategoryModule,
    ChatBotModule,
    PictureModule,
    ProductModule,
    AuthorModule,
    ActionModule,
    PostModule,
  ],
})
export class AppModule {}
