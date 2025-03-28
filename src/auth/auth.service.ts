import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { Prisma, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signIn(data: Prisma.UserCreateInput) {
    const user = await this.userService.getUser({ email: data.email });
    if (!user) throw new NotFoundException('User not found!');

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Unautorized!');

    const { password, ...result } = user;

    return result;
  }
}
