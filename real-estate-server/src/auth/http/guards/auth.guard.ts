import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    if (!token) {
      throw new HttpException('Token does not exist', HttpStatus.FORBIDDEN);
    }

    try {
      const result = this.authService.verifyToken(token);
      return Boolean(result);
    } catch (err) {
      if (err) {
        throw new HttpException('Token does not exist', HttpStatus.FORBIDDEN);
      }
    }
  }
}
