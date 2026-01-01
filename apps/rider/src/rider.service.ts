import { redisClient } from '@app/common';
import {
  loginRiderDto,
  RiderCreateDto,
  riderLocationDto,
  riderLocationFetchDto,
  riderLocationResponseDto,
  riderLocation
} from '@app/common/rider/rider.dto';
import { Rider } from '@app/common/rider/rider.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RiderService {
  constructor(
    @InjectRepository(Rider)
    private readonly riderDb: Repository<Rider>,
    private readonly jwtService: JwtService
  ) {}

  async registerRider(payload: RiderCreateDto) {
    const existRider = await this.riderDb.findOne({
      where: {
        phoneNumber: payload.phoneNumber
      }
    });
    if (existRider) {
      return existRider;
    }

    const newRider = this.riderDb.create({ ...payload });
    try {
      return await this.riderDb.save(newRider);
    } catch (error) {
      console.log(error);
      throw new RpcException({
        statusCode: 500,
        message: 'Internal Server Error In Registering Rider'
      });
    }
  }

  async loginRider(payload: loginRiderDto) {
    try {
      const checkUser = await this.riderDb.findOne({
        where: {
          phoneNumber: payload.phoneNumber
        }
      });
      if (!checkUser) {
        throw new RpcException({
          status: 404,
          message: 'No Rider Found'
        });
      }
      const userPin = checkUser.pin;
      if (userPin !== payload.pin) {
        throw new RpcException({
          status: 400,
          message: 'Invalid Password Bad Request'
        });
      }
      const accessToken = this.jwtService.sign({
        id: checkUser.id,
        fullName: checkUser.fullName
      });
      return {
        accessToken,
        id: checkUser.id,
        fullName: checkUser.fullName,
        phoneNumber: checkUser.phoneNumber,
        isVerified: checkUser.isVerified,
        isActive: checkUser.isActive
      };
    } catch (error) {
      if (error instanceof Error) throw error;
    }
  }

  //stores the riders location in the redis cache not in db for the quicker access of the live location
  async storeRiderLocation(payload: riderLocationDto) {
    try {
      const lat = payload.lat;
      const lon = payload.lon;
      const key = `rider:location:${payload.riderId}`;
      const timestamp = new Date().toISOString();

      await redisClient.set(key, JSON.stringify({ lat, lon, timestamp }), {
        EX: 300
      });
      await redisClient.geoAdd('rider:location', {
        latitude: lat,
        longitude: lon,
        member: payload.riderId
      });
      return true;
    } catch (error) {
      if (error instanceof Error) throw error;
    }
  }

  //gets the live location of rider from the redis cache and return the response as needed

  async getSingleRiderLocation(
    payload: riderLocationFetchDto
  ): Promise<riderLocationResponseDto> {
    const { riderId } = payload;
    const key = `rider:location:${riderId}`;
    const rider = await this.riderDb.findOneBy({
      id: riderId,
      isActive: true
    });
    if (!rider) {
      throw new RpcException({
        status: 404,
        message: 'Rider Is Offline'
      });
    }
    const cachedData = await redisClient.get(key);
    if (!cachedData) {
      throw new RpcException({
        status: 404,
        message: 'Rider Location Not Found'
      });
    }
    const parsedCache = JSON.parse(cachedData) as unknown;
    if (
      typeof parsedCache !== 'object' ||
      parsedCache === null ||
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      typeof (parsedCache as any).lat !== 'number' ||
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      typeof (parsedCache as any).lon !== 'number' ||
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      typeof (parsedCache as any).timestamp !== 'string'
    ) {
      throw new RpcException({
        status: 500,
        message: 'Invalid rider location cache data'
      });
    }

    const riderLocationCache = parsedCache as riderLocation;
    return {
      riderId: riderId,
      fullName: rider.fullName,
      phoneNumber: rider.phoneNumber,
      livelocation: {
        lat: riderLocationCache.lat,
        lon: riderLocationCache.lon as unknown as number,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        timestamp: riderLocationCache.timestamp
      }
    };
  }
}
