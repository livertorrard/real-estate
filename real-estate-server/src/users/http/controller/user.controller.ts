import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/users/services/user.service';
import { RegisterUserDto } from '../dto/register-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  register(@Body() dto: RegisterUserDto) {
    return this.userService.register(dto);
  }
}
