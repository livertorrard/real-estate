import { MaxLength } from '@nestjs/class-validator';
import { OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { GenderTypeEnum } from 'src/users/enums/gender.enum';
import { RegisterUserDto } from './register-user.dto';

export class UpdateUserDto extends OmitType(RegisterUserDto, ['password']) {
  @IsUUID()
  @IsString()
  @IsNotEmpty({ message: 'Please add Id for this user' })
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Please add birthday for this user' })
  birthday: string;

  @IsString()
  @IsNotEmpty({ message: 'Please add gender for this user' })
  gender: GenderTypeEnum;

  @IsString()
  @MaxLength(11)
  @IsNotEmpty({ message: 'Please add phone for this user' })
  phone: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty({ message: 'Please add role for this user' })
  authorizationId: string;
}
