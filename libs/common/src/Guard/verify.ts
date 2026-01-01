import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export class jwtVerify {
  constructor(
    private readonly jwtService: JwtService,
    private readonly jwtSecret: string
  ) {}

  async verify(token: string) {
    try {
      const user: {
        id: string;
        fullName: string;
      } = await this.jwtService.verify(token, {
        secret: this.jwtSecret
      });
      return user;
    } catch (error: any) {
      console.log(error);
      throw new UnauthorizedException('Invalid or epxired Token');
    }
  }
}
