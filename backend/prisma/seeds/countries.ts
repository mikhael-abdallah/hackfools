import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

export async function createGovs() {
  const prisma = new PrismaClient();
  const rawdata = fs.readFileSync(
    'prisma/scripts/countriesFlags/governments.json',
  );
  const data = JSON.parse(rawdata as any);

  const govs = data['Government'];

  await prisma.post.deleteMany();
  await prisma.government.deleteMany();

  await prisma.government.createMany({
    data: govs,
  });

  const postsRawdata = fs.readFileSync('prisma/seeds/posts.json');
  const postsData = JSON.parse(postsRawdata as any);

  await prisma.post.deleteMany();

  for (const post of postsData.posts) {
    await prisma.post.create({
      data: {
        content: post.content,
        government: {
          connect: {
            country: post.country,
          },
        },
      },
    });
  }
}
