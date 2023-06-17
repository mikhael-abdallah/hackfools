import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database';
import { GovernmentService } from './government.service';
import { GovernmentController } from './government.controller';

@Module({
  imports: [DatabaseModule],
  providers: [GovernmentService],
  controllers: [GovernmentController],
})
export class GovernmentModule {}
