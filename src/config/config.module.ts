import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [ConfigService],
  exports: [ConfigService], // 10. Make sure the export is there to use this service in another modules
})
export class ConfigModule {}
