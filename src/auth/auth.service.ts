import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { Prisma, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  async signIn(
    data: Prisma.UserCreateInput,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.getUser({ email: data.email });
    if (!user) throw new NotFoundException('User not found!');

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Unautorized!');

    const payload = { sub: user.id };

    return {
      access_token: await this.jwt.signAsync(payload),
    };
  }
}
