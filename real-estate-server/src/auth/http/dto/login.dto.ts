import { OmitType } from '@nestjs/swagger';
import { RegisterUserDto } from 'src/users/http/dto/register-user.dto';

export class LoginDto extends OmitType(RegisterUserDto, ['fullName']) {}
