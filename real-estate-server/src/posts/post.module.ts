import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PostController } from './http/controllers/post.controller';
import { PostRepository } from './repositories/post.repository';
import { PostService } from './services/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, PostRepository])],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
