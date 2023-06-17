import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from '@prisma/client';
import { ResponseInterface } from 'src/shared/response.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findMany(): Promise<ResponseInterface<Post[]>> {
    try {
      const posts = await this.postService.findMany();

      return { result: posts };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
