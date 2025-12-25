import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { LocatorController } from './locator.controller';
import { locatorService } from './locator.service';
import { connectRedis, disconnectRedis } from '@app/common/redis';

@Module({
  imports: [],
  controllers: [LocatorController],
  providers: [locatorService],
  exports: [locatorService]
})
export class LocatorModule implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await connectRedis();
  }
  async onModuleDestroy() {
    await disconnectRedis();
  }
}
