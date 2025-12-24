import { Module } from '@nestjs/common';
import { LocatorController } from './locator.controller';
import { LocatorService } from './locator.service';

@Module({
  imports: [],
  controllers: [LocatorController],
  providers: [LocatorService],
})
export class LocatorModule {}
