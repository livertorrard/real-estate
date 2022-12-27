import { Brackets, EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  searchUsers(keySearch: string): Promise<UserEntity[]> {
    return this.createQueryBuilder('user')
      .where(
        new Brackets((subQb) => {
          subQb.orWhere(`user.fullName LIKE :fullName`, {
            fullName: `${keySearch}%`,
          });

          subQb.orWhere(`user.phone LIKE :phone`, {
            phone: `${keySearch}%`,
          });

          subQb.orWhere(`user.email LIKE :email`, {
            email: `${keySearch}%`,
          });
        }),
      )
      .innerJoinAndSelect('user.auth', 'auth')
      .getMany();
  }
}
