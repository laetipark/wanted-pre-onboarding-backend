import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateUserDto } from '~/user/dto/create-user.dto';

@Entity({ name: 'USER' })
export class User {
  @PrimaryColumn({
    name: 'USER_ID',
  })
  userID: string;

  @CreateDateColumn({
    name: 'CREATED_AT',
    select: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'UPDATED_AT',
    select: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'DELETED_AT',
    select: false,
    nullable: true,
  })
  deletedAt: Date | null;

  static from(createUserDto: CreateUserDto) {
    const user = new CreateUserDto();
    user.userID = createUserDto.userID;

    return user;
  }
}
