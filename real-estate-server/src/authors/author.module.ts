import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './entities/author.entity';
import { AuthorRepository } from './repositories/author.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity, AuthorRepository])],
})
export class AuthorModule {}
