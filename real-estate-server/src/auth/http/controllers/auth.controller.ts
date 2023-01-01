import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { LOGGED_IN_SUCCESSFULLY } from 'src/auth/constant/message-logged.constant';
import { AuthEntity } from 'src/auth/entities/auth.entity';
import { ActiveUserDto } from 'src/users/http/dto/active-user.dto';
import { DeleteUserDto } from 'src/users/http/dto/delete-user.dto';
import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response,
  ): Promise<string> {
    const { token, role, name, id } = await this.authService.login(dto);
    response.cookie('token', token, { expire: Number(new Date()) + 86400 });
    response.cookie('role', role);
    response.cookie('fullname', name);
    response.cookie('id', id);

    return LOGGED_IN_SUCCESSFULLY;
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
