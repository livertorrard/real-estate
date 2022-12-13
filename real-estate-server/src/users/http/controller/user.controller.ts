import { Controller } from '@nestjs/common';
import { UserService } from 'src/users/services/user.service';

@Controller('users')
export class UserController {
  constructor(private UseService: UserService) {}
}
