import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database';
import { GetPostsRequest } from './io/get-posts.reponse';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findMany(): Promise<GetPostsRequest> {
    let posts = await this.prismaService.post.findMany({
      select: {
        id: true,
        content: true,
        government: {
          select: {
            id: true,
            country: true,
            icon: true,
          },
        },
        pontuation: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    posts = posts.filter((post) => Math.random() < Number(post.pontuation));

    posts.map((post) => delete post.pontuation);

    return posts;
  }

  public async create(input: { content: string; governmentId: string }) {
    const post = await this.prismaService.post.create({
      data: {
        content: input.content,
        governmentId: input.governmentId,
      },
      select: {
        id: true,
      },
    });

    return {
      id: post.id,
      ...input,
    };
  }
}
