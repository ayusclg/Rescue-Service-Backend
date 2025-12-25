import { Controller } from '@nestjs/common';
import { MediaService } from './media.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @MessagePattern({ cmd: 'upload_audio' })
  async uploadAudio(payload: string) {
    try {
      const response = await this.mediaService.uploadAudio(payload);
      return response;
    } catch (error) {
      throw new Error('Controller Error In Media Service', error);
    }
  }
}
