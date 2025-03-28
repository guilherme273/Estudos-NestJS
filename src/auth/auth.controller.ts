import { Body, Controller, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('signin')
  async signIn(@Body() data: Prisma.UserCreateInput) {
    return this.AuthService.signIn(data);
  }
}
