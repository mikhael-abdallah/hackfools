import { Module } from '@nestjs/common';
import { PostModule } from './modules/posts/posts.module';
import { DatabaseModule } from './modules/database';
import { ConfigModule } from '@nestjs/config';
import { GovernmentModule } from './modules/government/government.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'test'
          ? ['.env.test', '.env.dev']
          : '.env.dev',
    }),
    DatabaseModule,
    PostModule,
    GovernmentModule,
  ],
})
export class AppModule {}
