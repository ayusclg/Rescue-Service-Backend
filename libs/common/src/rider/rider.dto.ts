export class RiderCreateDto {
  fullName: string;
  phoneNumber: string;
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
