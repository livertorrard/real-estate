import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './entities/author.entity';
import { AuthorController } from './http/controllers/author.controller';
import { AuthorRepository } from './repositories/author.repository';
import { AuthorService } from './services/author.service';

@Module({
  controllers: [AuthorController],
  providers: [AuthorService],
  imports: [TypeOrmModule.forFeature([AuthorEntity, AuthorRepository])],
})
export class AuthorModule {}
