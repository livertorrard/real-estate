import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/services/user.service';
import { UserTypeEnum } from '../enums/user-type.enum';
import { LoginDto } from '../http/dto/login.dto';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private authRepo: AuthRepository,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  findIdOfAdmin() {
    return this.authRepo.findOneOrFail({
      select: ['id'],
      where: { typeUser: UserTypeEnum.ADMIN },
    });
  }

  login(dto: LoginDto) {
    console.log(dto);
    return;
  }
}
