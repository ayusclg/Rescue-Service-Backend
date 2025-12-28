import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RiderModule } from './rider.module';
import { DatabaseModule } from './db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/rider/.env'
    }),
    DatabaseModule,
    RiderModule
  ]
})
export class AppModule {}
