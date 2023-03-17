import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { AuthEntity } from 'src/auth/entities/auth.entity';
import { ActiveUserDto } from 'src/users/http/dto/active-user.dto';
import { DeleteUserDto } from 'src/users/http/dto/delete-user.dto';
import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('role')
  getRoles(@Query('search') keySearch: string): Promise<AuthEntity[]> {
    return this.authService.getRoles(keySearch);
  }

  @Post('role/active')
  changeActiveRole(@Body() dto: ActiveUserDto) {
    return this.authService.changeActiveRole(dto);
  }

  @Delete('role/delete')
  deleteRoles(@Body() dto: DeleteUserDto): Promise<void> {
    return this.authService.deleteRoles(dto.ids);
  }
}
