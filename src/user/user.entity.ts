import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'USER' })
export class User {
  @PrimaryColumn({
    name: 'USER_ID',
  })
  userID: string;
}
