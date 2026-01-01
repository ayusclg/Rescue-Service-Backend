export class RiderCreateDto {
  fullName: string;
  phoneNumber: string;
  pin: number;
  vechileDetails?: vechileDetails;
  riderDocument?: string[];
}

export class RiderResponseDto {
  id: string;
  fullName: string;
  phoneNumber: string;
}
interface vechileDetails {
  vechileNumber: string;
  vechileRegistrationNumber: string;
  vechileDocument: string[];
}

export class loginRiderDto {
  phoneNumber: string;
  pin: number;
}

export class RiderloginResponseDto {
  id: string;
  fullName: string;
  phoneNumber: string;
  isVerified: boolean;
  isActive: boolean;
  accessToken: string;
}

export class riderLocationDto {
  riderId: string;
  lat: number;
  lon: number;
}

export class riderLocationFetchDto {
  riderId: string;
}

export class riderLocationResponseDto {
  riderId: string;
  fullName: string;
  phoneNumber: string;
  livelocation: riderLocation;
}

export class riderLocation {
  lat: number;
  lon: number;
  timestamp: string;
}
