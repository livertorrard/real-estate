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
import { ActiveUserDto } from '../http/dto/active-user.dto';
import { RegisterUserDto } from '../http/dto/register-user.dto';
import { UpdateUserDto } from '../http/dto/update-user.dto';
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

  async searchUsers(keySearch: string) {
    let users: UserEntity[];

    if (keySearch) {
      users = await this.userRepo.searchUsers(keySearch);
    } else {
      users = await this.userRepo.find({ relations: ['auth'] });
    }

    return users.map((user) => ({
      ...user,
      role: user.auth.role,
    }));
  }

  async activeUser(dto: ActiveUserDto) {
    const { id, active } = dto;
    let numberActive: number;

    if (active) {
      numberActive = 1;
    } else {
      numberActive = 0;
    }

    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new BadRequestException('Email does not exist !');
    }

    return this.userRepo.save({ ...user, active: numberActive });
  }

  async getUserById(id: string) {
    const user = await this.userRepo.findOne(id);

    return { ...user };
  }

  async updateUser(dto: UpdateUserDto) {
    await this.userRepo.save(dto);
  }
}
