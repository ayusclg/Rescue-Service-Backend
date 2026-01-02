import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [SocketGateway],
  exports: [SocketGateway]
})
export class SocketModule {}
