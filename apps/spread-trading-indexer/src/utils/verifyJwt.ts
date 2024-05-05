import { ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const verifyJwt = (jwtService: JwtService, accessToken: string) => {
  try {
    return jwtService.verify<{
      address: string;
      privateKey: string;
    }>(accessToken);
  } catch (error) {
    throw new ForbiddenException('Invalid token');
  }
};
