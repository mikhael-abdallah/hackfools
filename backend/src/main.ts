import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { PrismaService } from './modules/database';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false,
    }),
  );

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });

  app.setGlobalPrefix('/api/');
  app.useGlobalPipes(new ValidationPipe());

  const prismaService = app.get(PrismaService);

  await prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}

bootstrap();
