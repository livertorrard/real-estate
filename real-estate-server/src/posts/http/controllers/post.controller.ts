import { Controller, Get } from '@nestjs/common';
import { PostService } from 'src/posts/services/post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getPosts() {
    return this.postService.getPosts();
  }
}
