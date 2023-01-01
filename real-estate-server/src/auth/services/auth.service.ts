import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { env } from 'process';
import { ActiveUserDto } from 'src/users/http/dto/active-user.dto';
import { UserService } from 'src/users/services/user.service';
import { In } from 'typeorm';
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
    this.comparePassword(password, user.password);

    const token = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        name: user.fullname,
      },
      { expiresIn: env.JWT_EXPIRE, secret: env.JWT_SECRET },
    );

    return { token, role: user.auth.role, name: user.fullname, id: user.id };
  }

  findAll(): Promise<AuthEntity[]> {
    return this.authRepo.find();
  }

  comparePassword(password: string, hashPassword: string): void {
    const passwordIsValid = compareSync(password, hashPassword);
    if (!passwordIsValid) {
      throw new BadRequestException('Password is not valid !');
    }
  }

  getRoles(keySearch: string): Promise<AuthEntity[]> {
    if (!keySearch) {
      return this.authRepo.find();
    }

    return this.authRepo.searchRoles(keySearch);
  }

  async changeActiveRole(dto: ActiveUserDto) {
    const { id, active } = dto;
    let numberActive: number;

    if (active) {
      numberActive = 1;
    } else {
      numberActive = 0;
    }

    const role = await this.authRepo.findOne(id);
    if (!role) {
      throw new BadRequestException('Role does not exist !');
    }

    return this.authRepo.save({ ...role, active: numberActive });
  }

  async deleteRoles(ids: string[]): Promise<void> {
    const roles = await this.authRepo.find({ id: In(ids) });
    if (!roles.length) {
      throw new BadRequestException('Role does not exist !');
    }
    await this.authRepo.softDelete({ id: In(ids) });
  }
}
