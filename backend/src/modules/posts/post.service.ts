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
        createdAt: true,
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

    posts.map((post) => {
      post.createdAt = this.convertToBrazilianFormat(
        post.createdAt,
      ) as unknown as Date;
    });

    return posts;
  }
  private convertToBrazilianFormat(date) {
    const brazilianDate = new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo',
    }).format(date);
    return brazilianDate;
  }

  public async findManyByGov(governmentId: string): Promise<GetPostsRequest> {
    const posts = await this.prismaService.post.findMany({
      where: {
        governmentId,
      },
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
        createdAt: true,
      },
      orderBy: [
        {
          pontuation: 'desc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });

    posts.map((post) => {
      post.createdAt = this.convertToBrazilianFormat(
        post.createdAt,
      ) as unknown as Date;
    });

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
