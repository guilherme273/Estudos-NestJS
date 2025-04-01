import { IsAlpha, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  @IsAlpha()
  @Length(3)
  name: string;

  password: string;
}
