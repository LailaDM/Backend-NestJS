import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly registerRepository: Repository<User>, // type ORM Repository which contains CRUD methods for database interaction
  ) {}
  async create(registerUser: User) {
    const user = this.registerRepository.create(registerUser); //passing register to DB
    return this.registerRepository.save(user);
  }

  async login(createUserDto: CreateUserDto): Promise<User> {
    const loginResponse = {
        id: 0,
        email: '',
        password: '',
      };
    const loginSuccess = await this.registerRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (
      loginSuccess !== null &&
      loginSuccess.password == createUserDto.password
    ) {
      console.log('success');
      return loginSuccess;
    } else {
      console.log('failure');
      return loginResponse;
    }
  }

  // entity is is an object which can be inserted in a tabel

  // async showById(id: number): Promise<User> {
  //   const user = await this.findById(id);

  //   delete user.password;
  //   return user;
  // }

  // async findById(id: number) {
  //   return await User.findOne(id);
  // }

  // async findByEmail(email: string) {
  //   return await User.findOne({
  //     where: {
  //       email: email,
  //     },
  //   });
  // }
}