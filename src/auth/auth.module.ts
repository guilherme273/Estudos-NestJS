import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from 'src/database/prisma.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    UserModule,
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.tokenJWT,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
})
export class AuthModule {}
