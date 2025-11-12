import { Module } from '@nestjs/common';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';

// Decorators
@Module({
  controllers: [EpisodesController], // This controller is part of the module
  providers: [EpisodesService],
})
export class EpisodesModule {}
