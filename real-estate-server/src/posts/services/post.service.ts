import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { CreatePostDto } from '../http/dto/create-post.dto';
import { PictureService } from 'src/pictures/services/picture.service';
import { PostEntity } from '../entities/post.entity';
import { FindOneOptions, In, Like, UpdateResult } from 'typeorm';
import { removeImageFromServer } from 'src/core/core-helper';

@Injectable()
export class PostService {
  constructor(
    private postRepo: PostRepository,
    private pictureService: PictureService,
  ) {}

  getPosts(): Promise<PostEntity[]> {
    return this.postRepo.find({
      order: { createdAt: 'DESC' },
      relations: ['pictures'],
      take: 5,
    });
  }

  getAllPosts(key: string): Promise<PostEntity[]> {
    return this.postRepo.find({
      where: { name: Like(`%${key}%`) },
      relations: ['pictures'],
      order: { updatedAt: 'DESC' },
    });
  }

  async createPost(file, dto: CreatePostDto, id?: string): Promise<PostEntity> {
    const post = await this.postRepo.save({ ...dto, id, deletedAt: null });
    if (file) {
      await this.pictureService.createPicture({
        postId: post.id,
        pictureName: file.filename,
      });
    }

    return post;
  }

  updateOneById(id: string, data: Partial<PostEntity>): Promise<UpdateResult> {
    return this.postRepo.update(id, data);
  }

  findOne(options: FindOneOptions<PostEntity>): Promise<PostEntity> {
    return this.postRepo.findOne(options);
  }

  async deleteManyByIds(ids: string[], isRemoveFile?: boolean): Promise<void> {
    const postPicures = await this.pictureService.find({
      select: ['pictureName'],
      where: { postId: In(ids) },
    });

    await this.postRepo.softDelete({ id: In(ids) });
    if (!isRemoveFile) {
      return;
    }

    await this.pictureService.softDelete({ postId: In(ids) });
    const postPictureNames = postPicures.map(({ pictureName }) => pictureName);
    removeImageFromServer(postPictureNames);
  }

  async updatePost(id: string, dto: CreatePostDto, file): Promise<void> {
    await this.deleteManyByIds([id], Boolean(file));
    await this.createPost(file, dto, id);
  }
}
