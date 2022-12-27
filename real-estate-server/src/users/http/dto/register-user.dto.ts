import { MaxLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { MAX_FULL_NAME_LENGTH } from '../../constants/max-full-name-length.constant';

export class RegisterUserDto {
  @ApiProperty()
  @MaxLength(MAX_FULL_NAME_LENGTH)
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
