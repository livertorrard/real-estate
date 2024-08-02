import { PickType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

export class UpdateActiveDto extends PickType(CreatePostDto, ['active']) {}
