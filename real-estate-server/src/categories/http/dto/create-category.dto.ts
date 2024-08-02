import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { NAME_LENGTH } from 'src/posts/constants/name-length.constant';

export class CreateCategoryDto {
  @ApiProperty()
  @MaxLength(NAME_LENGTH)
  @IsString()
  @IsNotEmpty()
  name: string;
}
