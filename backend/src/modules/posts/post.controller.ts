import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ResponseInterface } from 'src/shared/response.interface';
import { GetPostsRequest } from './io/get-posts.reponse';
import { CreatePostRequest } from './request/create-post.request';
import { FindPostsByGovRequest } from './request/find-posts-by-gov.request';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findMany(): Promise<ResponseInterface<GetPostsRequest>> {
    try {
      const posts = await this.postService.findMany();

      return { result: posts };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':governmentId')
  @HttpCode(HttpStatus.OK)
  public async findManyByGov(
    @Param() query: FindPostsByGovRequest,
  ): Promise<ResponseInterface<GetPostsRequest>> {
    try {
      const posts = await this.postService.findManyByGov(query.governmentId);

      return { result: posts };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  public async createPost(@Body() input: CreatePostRequest) {
    try {
      const post = await this.postService.create(input);
      return { result: post };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
