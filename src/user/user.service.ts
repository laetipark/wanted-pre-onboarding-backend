import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '~/user/user.entity';
import { CreateUserDto } from '~/user/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private user: Repository<User>,
  ) {}

  async addUser(createUserDto: CreateUserDto) {
    const user = User.from(createUserDto);

    await this.user.save(user);
    return {
      message: '유저를 등록하였습니다.',
      data: user,
    };
  }
}
