import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Government } from '@prisma/client';
import { ResponseInterface } from 'src/shared/response.interface';
import { GovernmentService } from './government.service';

@Controller('government')
export class GovernmentController {
  constructor(private readonly governmentService: GovernmentService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findMany(): Promise<ResponseInterface<Government[]>> {
    try {
      const govs = await this.governmentService.findMany();

      return { result: govs };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
