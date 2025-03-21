import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './userDTOS/UserDto.dto';

@Controller('user')
export class UserController {
  @Post()
  createUser(@Body() createUser: CreateUserDTO) {
    return { ...createUser, password: undefined };
  }
}
