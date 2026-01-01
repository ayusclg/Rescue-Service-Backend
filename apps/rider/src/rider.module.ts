import { Module } from '@nestjs/common';
import { RiderController } from './rider.controller';
import { RiderService } from './rider.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rider } from '@app/common/rider/rider.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rider]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET')!,
        signOptions: { expiresIn: config.get<number>('JWT_EXPIRY') || '1d' }
      })
    })
  ],
  exports: [],
  providers: [RiderService],
  controllers: [RiderController]
})
export class RiderModule {
  // constructor(private readonly config: ConfigService) {
  //   console.log(this.config.get<string>('JWT_SECRET'));
  // }
}
