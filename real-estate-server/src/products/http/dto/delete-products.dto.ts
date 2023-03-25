import { ArrayNotEmpty, IsUUID } from '@nestjs/class-validator';

export class DeleteProducts {
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  ids: string[];
}
