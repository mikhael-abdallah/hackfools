import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  imports: [DatabaseModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
