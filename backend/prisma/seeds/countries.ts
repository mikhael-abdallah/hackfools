import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

export async function createGovs() {
  const prisma = new PrismaClient();
  const rawdata = fs.readFileSync(
    'prisma/scripts/countriesFlags/governments.json',
  );
  const data = JSON.parse(rawdata as any);

  const govs = data['Government'];

  const actualGovs = await prisma.government.findMany({});
  const govsSet = new Set(actualGovs.map((gov) => gov.country));

  const createInput = [];
  for (const gov of govs) {
    if (!govsSet.has(gov.country)) {
      createInput.push(gov);
    }
  }

  await prisma.government.createMany({
    data: createInput,
  });
}
