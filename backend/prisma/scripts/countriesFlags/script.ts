import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
  const paises = await prisma.pais.findMany();
  for (const { nome_pt, sigla } of paises) {
    try {
      const url = `https://flagsapi.com/${sigla}/flat/64.png`;
      const res = await axios.get(url);
      if (res.status == 200) {
        console.log('Creating ', nome_pt);
        await prisma.government.create({
          data: {
            country: nome_pt,
            icon: url,
          },
        });
      } else {
        console.log('Not created ', nome_pt);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

main().then();
