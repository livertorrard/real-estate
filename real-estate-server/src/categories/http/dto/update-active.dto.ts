import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateActiveDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  active: number;
}
