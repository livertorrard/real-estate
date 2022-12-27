import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { env } from 'process';
import { UserService } from 'src/users/services/user.service';
import { AuthEntity } from '../entities/auth.entity';
import { UserTypeEnum } from '../enums/user-type.enum';
import { LoginDto } from '../http/dto/login.dto';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private authRepo: AuthRepository,
    private jwtService: JwtService,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  findIdOfAdmin() {
    return this.authRepo.findOneOrFail({
      select: ['id'],
      where: { typeUser: UserTypeEnum.ADMIN },
    });
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.userService.findOne({
      where: { email },
      relations: ['auth'],
    });

    if (!user) {
      throw new BadRequestException('Email does not exist !');
    }

    const passwordIsValid = compareSync(password, user.password);
    if (!passwordIsValid) {
      throw new BadRequestException('Password is not valid !');
    }

    const token = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        name: user.fullname,
      },
      { expiresIn: env.JWT_EXPIRE, secret: env.JWT_SECRET },
    );

    return { token, role: user.auth.role, name: user.fullname };
  }

  findAll(): Promise<AuthEntity[]> {
    return this.authRepo.find();
  }
}
