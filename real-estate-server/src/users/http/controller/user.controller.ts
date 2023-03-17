import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/http/guards/auth.guard';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/services/user.service';
import { ActiveUserDto } from '../dto/active-user.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { DeleteUserDto } from '../dto/delete-user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
@UseGuards(AuthGuard)
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

  @Post('create')
  createUser(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(dto);
  }

  @Delete('delete')
  deleleUsers(@Body() dto: DeleteUserDto) {
    return this.userService.deleteUsers(dto.ids);
  }

  @Post(':id/change-password')
  changePassword(@Body() dto: ChangePasswordDto, @Param('id') id: string) {
    return this.userService.changePassword(dto, id);
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
