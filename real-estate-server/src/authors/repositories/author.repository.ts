import { EntityRepository, Repository } from 'typeorm';
import { AuthorEntity } from '../entities/author.entity';

@EntityRepository(AuthorEntity)
export class AuthorRepository extends Repository<AuthorEntity> {}
