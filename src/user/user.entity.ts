import { Entity, PrimaryColumn } from 'typeorm';
import { CreateUserDto } from '~/user/dto/create-user.dto';

@Entity({ name: 'USER' })
export class User {
  @PrimaryColumn({
    name: 'USER_ID',
  })
  userID: string;

  static from(createUserDto: CreateUserDto) {
    const user = new CreateUserDto();
    user.userID = createUserDto.userID;

    return user;
  }
}
