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
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  searchUsers(@Query('search') keySearch: string) {
    return this.userService.searchUsers(keySearch);
  }

  @Post('registers')
  register(@Body() dto: RegisterUserDto) {
    return this.userService.register(dto);
  }

  @Post('active')
  @UseGuards(AuthGuard)
  activeUser(@Body() dto: ActiveUserDto) {
    return this.userService.activeUser(dto);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  createUser(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(dto);
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  deleteUsers(@Body() dto: DeleteUserDto) {
    return this.userService.deleteUsers(dto.ids);
  }

  @Post(':id/change-password')
  @UseGuards(AuthGuard)
  changePassword(@Body() dto: ChangePasswordDto, @Param('id') id: string) {
    return this.userService.changePassword(dto, id);
  }

  @Put(':id/edit')
  @UseGuards(AuthGuard)
  updateUser(@Body() dto: UpdateUserDto) {
    return this.userService.updateUser(dto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
