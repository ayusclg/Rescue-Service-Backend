import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway
} from '@nestjs/websockets';

@WebSocketGateway()
export class SocketGateway {
  @SubscribeMessage('message')
  handleMessage(@MessageBody() payload: string): string {
    return payload;
  }
}
