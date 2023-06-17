import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findMany(): Promise<Post[]> {
    return this.prismaService.post.findMany();
  }
}
