import { Body, Controller, Get } from '@nestjs/common';
import { ChatBotService } from 'src/chat-bots/services/chat-bot.service';
import { ChatBotDto } from '../dto/chat-bot.dto';

@Controller('chat-bots')
export class ChatBotController {
  constructor(private chatBotService: ChatBotService) {}

  @Get()
  getContents(@Body() dto: ChatBotDto) {
    return this.chatBotService.getContents(dto.content);
  }
}
