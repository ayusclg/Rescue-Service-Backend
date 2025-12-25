import { Body, Controller, HttpException, Inject, Post } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
 
@Controller('file')
export class ApiGatewayController {
  constructor(@Inject('media_Service') private readonly client: ClientProxy) {}

  @Post('upload')
  upload(@Body('filePath') filePath: string): string {
    console.log(filePath);
    this.client.send({ cmd: 'upload_audio' }, filePath);
    throw new HttpException('file uploaded', 200);
  }
}
