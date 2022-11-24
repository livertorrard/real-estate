import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { HEADERS } from '../constants/headers.constant';
import { URL_CHAT_BOT } from '../constants/url-chat-bot.constant';

@Injectable()
export class ChatBotService {
  constructor(private readonly httpService: HttpService) {}

  async getContents(content: string) {
    const json = JSON.stringify({ content });
    const response = await lastValueFrom(
      this.httpService.get(URL_CHAT_BOT, {
        data: json,
        headers: HEADERS,
      }),
    );

    return response.data;
  }
}
