import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from 'src/users/services/user.service';
import { ActiveUserDto } from '../dto/active-user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  searchUsers(@Query('search') keySearch: string) {
    return this.userService.searchUsers(keySearch);
  }

  @Post('register')
  register(@Body() dto: RegisterUserDto) {
    return this.userService.register(dto);
  }

  @Post('active')
  activeUser(@Body() dto: ActiveUserDto) {
    return this.userService.activeUser(dto);
  }

  @Put(':id/edit')
  updateUser(@Body() dto: UpdateUserDto) {
    return this.userService.updateUser(dto);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
