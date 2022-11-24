import {
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsString,
} from '@nestjs/class-validator';
import { MAX_LENGTH } from 'src/chat-bots/constants/max-length.constant';
import { MIN_LENGTH } from 'src/chat-bots/constants/min-length.constant';

export class ChatBotDto {
  @MinLength(MIN_LENGTH)
  @MaxLength(MAX_LENGTH)
  @IsNotEmpty()
  @IsString()
  content: string;
}
