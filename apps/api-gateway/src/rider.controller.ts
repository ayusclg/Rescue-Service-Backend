import {
  loginRiderDto,
  RiderCreateDto,
  riderLocationDto,
  riderLocationFetchDto,
  riderLocationResponseDto,
  RiderloginResponseDto,
  RiderResponseDto
} from '@app/common';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
  Res
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import type { Response } from 'express';

@Controller('rider')
export class RiderController {
  constructor(
    @Inject('rider_service') private readonly riderClient: ClientProxy
  ) {}
  @Get('/hit')
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

  @Post('/login')
  async loginRider(
    @Body() payload: loginRiderDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const login = await this.riderClient
      .send<RiderloginResponseDto, loginRiderDto>('login-rider', payload)
      .toPromise();
    if (!login) {
      throw new HttpException(
        'CouldNot Fetch Logged In User',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    res.cookie('accessToken', login.accessToken, {
      httpOnly: false,
      secure: false
    });
    return login;
  }

  @Post('/location')
  storeLiveLocation(@Body() payload: riderLocationDto) {
    const response = this.riderClient.emit(
      'rider-live-location-store',
      payload
    );
    if (!response) {
      throw new HttpException(
        'Storing Location Of Rider Failed',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('/location')
  async getRiderLocation(
    @Query() payload: riderLocationFetchDto
  ): Promise<riderLocationResponseDto> {
    const rider = await this.riderClient
      .send<
        riderLocationResponseDto,
        riderLocationFetchDto
      >('rider-live-location', payload)
      .toPromise();
    if (!rider) {
      throw new HttpException(
        'Fetching Rider Location Failed',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return rider;
  }
}
