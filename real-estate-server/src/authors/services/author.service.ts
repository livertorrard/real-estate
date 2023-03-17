import { Injectable } from '@nestjs/common';
import { AuthorEntity } from '../entities/author.entity';
import { AuthorRepository } from '../repositories/author.repository';

@Injectable()
export class AuthorService {
  constructor(private authorRepo: AuthorRepository) {}

  getAuthors(): Promise<AuthorEntity[]> {
    return this.authorRepo.find();
  }
}
