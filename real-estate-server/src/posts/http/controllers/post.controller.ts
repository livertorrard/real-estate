import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/core/core-helper';
import { PostService } from 'src/posts/services/post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostEntity } from 'src/posts/entities/post.entity';
import { UpdateActiveDto } from '../dto/update-active.dto';
import { getIds } from 'src/core/decorators/get-ids.decorator';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getPosts(): Promise<PostEntity[]> {
    return this.postService.getPosts();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', storage))
  createPost(
    @UploadedFile() file,
    @Body() dto: CreatePostDto,
  ): Promise<PostEntity> {
    return this.postService.createPost(file, dto);
  }

  @Get('all')
  getAllPosts(@Query('search') key: string): Promise<PostEntity[]> {
    return this.postService.getAllPosts(key);
  }

  @Get(':id')
  getPostById(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.findOne({ where: { id }, relations: ['pictures'] });
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', storage))
  async updatePost(
    @Param('id') id: string,
    @Body() dto: CreatePostDto,
    @UploadedFile() file,
  ) {
    await this.postService.updatePost(id, dto, file);
  }

  @Put(':id/active')
  async updateActive(@Param('id') id: string, @Body() dto: UpdateActiveDto) {
    await this.postService.updateOneById(id, dto);
  }

  @Delete()
  async deleteManyByIds(@getIds('ids') ids: string[]): Promise<void> {
    await this.postService.deleteManyByIds(ids, true);
  }
}
