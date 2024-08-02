import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PostController } from './http/controllers/post.controller';
import { PostRepository } from './repositories/post.repository';
import { PostService } from './services/post.service';
import { PictureModule } from 'src/pictures/picture.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, PostRepository]),
    PictureModule,
  ],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}
