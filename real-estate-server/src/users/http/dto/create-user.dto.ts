import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class CreateUserDto extends OmitType(UpdateUserDto, ['id']) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
