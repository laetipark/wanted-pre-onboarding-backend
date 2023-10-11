import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '~/user/user.service';
import { CreateUserDto } from '~/user/dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async insertCompany(@Body() createUserDto: CreateUserDto) {
    return await this.userService.addUser(createUserDto);
  }
}
