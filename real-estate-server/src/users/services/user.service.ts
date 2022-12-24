import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { genSaltSync, hash } from 'bcrypt';
import { AuthService } from 'src/auth/services/auth.service';
import { FindOneOptions } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { RegisterUserDto } from '../http/dto/register-user.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}
  private readonly saltRound = 10;

  async register(dto: RegisterUserDto): Promise<void> {
    const existedUser = await this.userRepo.findOne({ email: dto.email });
    if (existedUser) {
      throw new BadRequestException('Email already exists');
    }

    const { id } = await this.authService.findIdOfAdmin();
    const salt = genSaltSync(this.saltRound);
    const hashPassword = await hash(dto.password, salt);

    await this.userRepo.save({
      ...dto,
      password: hashPassword,
      authorizationId: id,
    });
  }

  findOne(conditions: FindOneOptions<UserEntity>): Promise<UserEntity> {
    return this.userRepo.findOne(conditions);
  }
}
