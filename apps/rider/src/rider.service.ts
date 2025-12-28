import { RiderCreateDto } from '@app/common/rider/rider.dto';
import { Rider } from '@app/common/rider/rider.entity';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RiderService {
  constructor(
    @InjectRepository(Rider)
    private readonly riderDb: Repository<Rider>
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
}
