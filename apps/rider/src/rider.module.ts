import { Module } from '@nestjs/common';
import { RiderController } from './rider.controller';
import { RiderService } from './rider.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rider } from '@app/common/rider/rider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rider])],
  exports: [],
  providers: [RiderService],
  controllers: [RiderController]
})
export class RiderModule {}
