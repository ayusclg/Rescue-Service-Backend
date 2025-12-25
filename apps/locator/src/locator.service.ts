import { Injectable } from '@nestjs/common';
import { redisClient } from '@app/common/redis';
@Injectable()
export class locatorService {
  async updateRiderLocation(
    riderId: string,
    lat: number,
    lon: number
  ): Promise<boolean> {
    try {
      await redisClient.geoAdd('geo:ambulance-rider', {
        longitude: lon,
        latitude: lat,
        member: riderId
      });

      return true;
    } catch (error: unknown) {
      console.log('Redis Error In Storing Rider Details', error);

      return false;
    }
  }
}
