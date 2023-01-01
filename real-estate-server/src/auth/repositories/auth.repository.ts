import { Brackets, EntityRepository, Repository } from 'typeorm';
import { AuthEntity } from '../entities/auth.entity';

@EntityRepository(AuthEntity)
export class AuthRepository extends Repository<AuthEntity> {
  searchRoles(keySearch: string): Promise<AuthEntity[]> {
    return this.createQueryBuilder('auth')
      .where(
        new Brackets((subQb) => {
          subQb.orWhere(`auth.typeUser LIKE :typeUser`, {
            typeUser: `${keySearch}%`,
          });

          subQb.orWhere(`auth.role LIKE :role`, {
            role: `${keySearch}%`,
          });

          subQb.orWhere(`auth.description LIKE :description`, {
            description: `${keySearch}%`,
          });
        }),
      )
      .getMany();
  }
}
