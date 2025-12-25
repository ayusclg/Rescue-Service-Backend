import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'media_Service',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3003
        }
      }
    ])
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService]
})
export class ApiGatewayModule {}
