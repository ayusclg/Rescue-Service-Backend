import {
  loginRiderDto,
  RiderCreateDto,
  riderLocationDto,
  riderLocationFetchDto,
  riderLocationResponseDto
} from '@app/common/rider/rider.dto';
import { Controller } from '@nestjs/common';
import {
  EventPattern,
  MessagePattern,
  RpcException
} from '@nestjs/microservices';
import { RiderService } from './rider.service';

@Controller()
export class RiderController {
  constructor(private readonly rider: RiderService) {}
  @MessagePattern('register-rider')
  async registerRider(payload: RiderCreateDto) {
    const newRider = await this.rider.registerRider(payload);
    if (!newRider) {
      throw new RpcException({
        statusCode: 500,
        message: 'CouldNot Get The Created User;'
      });
    }
    return {
      fullName: newRider.fullName,
      id: newRider.id,
      phoneNumber: newRider.phoneNumber,
      createdAt: newRider.createdAt
    };
  }

  @MessagePattern('login-rider')
  async loginRider(payload: loginRiderDto) {
    const login = await this.rider.loginRider(payload);
    if (!login) {
      throw new RpcException({
        status: 500,
        message: 'CouldNot Login Rider'
      });
    }
    return login;
  }

  @MessagePattern('rider-live-location')
  async getSingleRiderLocation(
    payload: riderLocationFetchDto
  ): Promise<riderLocationResponseDto> {
    const riderLocation = await this.rider.getSingleRiderLocation(payload);
    if (!riderLocation) {
      throw new RpcException({
        status: 500,
        message: 'Internal Server Error In Fetching Rider Location'
      });
    }
    return riderLocation;
  }

  @EventPattern('rider-live-location-store')
  async storeLiveLocation(payload: riderLocationDto) {
    const store = await this.rider.storeRiderLocation(payload);
    if (!store) {
      throw new RpcException({
        status: 500,
        message: 'Internal Server Error In Storing Rider location'
      });
    }
    return true;
  }
}
