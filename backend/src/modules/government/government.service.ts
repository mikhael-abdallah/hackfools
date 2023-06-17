import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database';
import { Government } from '@prisma/client';

@Injectable()
export class GovernmentService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findMany(): Promise<Government[]> {
    const brazil = await this.prismaService.government.findFirst({
      where: {
        country: 'Brasil',
      },
    });
    const allCountries = await this.prismaService.government.findMany({
      where: {
        country: {
          not: 'Brasil',
        },
      },
      orderBy: {
        country: 'asc',
      },
    });

    return [brazil, ...allCountries];
  }
}
