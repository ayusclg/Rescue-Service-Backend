import { Injectable } from '@nestjs/common';
import cloudinary from 'cloudinary';
@Injectable()
export class MediaService {
  async uploadAudio(file: string) {
    try {
      const upload = await cloudinary.v2.uploader.upload(file, {
        resource_type: 'video',
        folder: 'audio_files'
      });
      return {
        uploadUrl: upload.url,
        publicUrl: upload.public_id
      };
    } catch (error: any) {
      throw new Error('Media Service Error', error);
    }
  }
}
