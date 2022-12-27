import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { LOGGED_IN_SUCCESSFULLY } from 'src/auth/constant/message-logged.constant';
import { AuthEntity } from 'src/auth/entities/auth.entity';
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
    const { token, role, name } = await this.authService.login(dto);
    response.cookie('token', token, { expire: Number(new Date()) + 86400 });
    response.cookie('role', role);
    response.cookie('fullname', name);

    return LOGGED_IN_SUCCESSFULLY;
  }

  @Get('role')
  async getRoles(): Promise<AuthEntity[]> {
    return this.authService.findAll();
  }
}
