import { RiderCreateDto } from '@app/common/rider/rider.dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
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
    return newRider;
  }
}
