import { Module } from '@nestjs/common';

import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { RiderController } from './rider.controller';
import { ConfigService, ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: 'user_service',
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('USER_HOST'),
            port: config.get<number>('USER_PORT')
          }
        })
      },
      {
        name: 'rider_service',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('RIDER_HOST'),
            port: config.get<number>('RIDER_PORT')
          }
        })
      },
      {
        name: 'locator_service',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('LOCATOR_HOST'),
            port: config.get<number>('LOCATOR_PORT')
          }
        })
      }
    ])
  ],
  controllers: [UserController, RiderController]
})
export class ApiGatewayModule {}
