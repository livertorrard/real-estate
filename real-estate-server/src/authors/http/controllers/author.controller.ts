import { Controller, Get } from '@nestjs/common';
import { AuthorEntity } from 'src/authors/entities/author.entity';
import { AuthorService } from 'src/authors/services/author.service';

@Controller('authors')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Get()
  getAuthors(): Promise<AuthorEntity[]> {
    return this.authorService.getAuthors();
  }
}
