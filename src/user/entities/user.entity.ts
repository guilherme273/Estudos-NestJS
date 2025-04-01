import { User as UserPrisma } from '@prisma/client';

export class User implements UserPrisma {
  name: string;
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
