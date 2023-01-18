/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() User: User) {
    return this.usersService.create(User);
  }

  @Post("/login")
  async login(@Body()createUserDto: CreateUserDto) {
  const loginResult = await this.usersService.login(createUserDto);
  return loginResult;
  }
}