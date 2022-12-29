import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsUUID } from 'class-validator';

export class DeleteUserDto {
  @ApiProperty()
  @IsUUID(undefined, { each: true })
  @IsArray()
  @ArrayNotEmpty()
  ids: string[];
}
