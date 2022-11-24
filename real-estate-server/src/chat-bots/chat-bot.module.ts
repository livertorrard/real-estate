import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ChatBotController } from './http/controllers/chat-bot.controller';
import { ChatBotService } from './services/chat-bot.service';

@Module({
  imports: [HttpModule],
  providers: [ChatBotService],
  controllers: [ChatBotController],
})
export class ChatBotModule {}
