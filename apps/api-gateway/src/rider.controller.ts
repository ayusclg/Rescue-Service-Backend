import { RiderCreateDto, RiderResponseDto } from '@app/common';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('rider')
export class RiderController {
  constructor(
    @Inject('rider_service') private readonly riderClient: ClientProxy
  ) {}
  @Get('/')
  random(): string {
    return `this is rider controller in api-gateway`;
  }

  @Post('/')
  async registerRider(@Body() createRiderDto: RiderCreateDto) {
    const response = await this.riderClient
      .send<RiderResponseDto, RiderCreateDto>('register-rider', createRiderDto)
      .toPromise();
    if (!response) {
      throw new HttpException(
        'Rider Not Created',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return response;
  }
}
