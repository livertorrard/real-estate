import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { MaxLength, IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { CODE_LENGTH } from 'src/posts/constants/code-length.constant';
import { DESCRIPTION_LENGTH } from 'src/posts/constants/description-length.constant';
import { NAME_LENGTH } from 'src/posts/constants/name-length.constant';

export class CreatePostDto {
  @ApiProperty()
  @MaxLength(NAME_LENGTH)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @MaxLength(DESCRIPTION_LENGTH)
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @Transform(({ value }) => {
    return Boolean(Number(value));
  })
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @ApiProperty()
  @MaxLength(CODE_LENGTH)
  @IsString()
  @IsNotEmpty()
  code: string;
}
