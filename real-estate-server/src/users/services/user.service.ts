import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { genSaltSync, hash } from 'bcrypt';
import { AuthService } from 'src/auth/services/auth.service';
import { FindOneOptions, In } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { ActiveUserDto } from '../http/dto/active-user.dto';
import { ChangePasswordDto } from '../http/dto/change-password.dto';
import { CreateUserDto } from '../http/dto/create-user.dto';
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
    await this.validateExistedUserEmailAndPhone(dto.email);
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
    if (id === 'undefined') {
      return {};
    }

    return this.userRepo.findOne(id);
  }

  async updateUser(dto: UpdateUserDto): Promise<void> {
    await this.userRepo.save(dto);
  }

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    await this.validateExistedUserEmailAndPhone(dto.email);
    await this.validateExistedUserPhone(dto.phone);

    const salt = genSaltSync(this.saltRound);
    const hashPassword = await hash(dto.password, salt);

    return this.userRepo.save({ ...dto, password: hashPassword });
  }

  async validateExistedUserEmailAndPhone(email: string): Promise<void> {
    const existedUser = await this.userRepo.findOne({
      where: { email },
    });

    if (existedUser) {
      throw new BadRequestException('Email or Number Phone already exists');
    }
  }

  async validateExistedUserPhone(phone: string): Promise<void> {
    const existedUser = await this.userRepo.findOne({
      where: { phone },
    });

    if (existedUser) {
      throw new BadRequestException('Number Phone already exists');
    }
  }

  async deleteUsers(ids: string[]): Promise<void> {
    await this.userRepo.softDelete({ id: In(ids) });
  }

  async changePassword(dto: ChangePasswordDto, id: string): Promise<void> {
    const { confirmNewPassword, newPassword, oldPassword } = dto;
    const existedUser = await this.userRepo.findOne(id);

    this.authService.comparePassword(oldPassword, existedUser.password);
    if (newPassword !== confirmNewPassword) {
      throw new BadRequestException('Password does not match');
    }

    const salt = genSaltSync(this.saltRound);
    const hashPassword = await hash(newPassword, salt);
    await this.userRepo.update(id, { password: hashPassword });
  }
}
