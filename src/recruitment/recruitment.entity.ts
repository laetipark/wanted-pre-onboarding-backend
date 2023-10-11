import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from 'typeorm';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';

abstract class Common {
  @PrimaryGeneratedColumn({
    name: 'RECRUIT_ID',
    type: 'bigint',
    unsigned: true,
  })
  recruitID: number;
}

@Entity({ name: 'RECRUITMENT' })
export class Recruitment extends Common {
  @PrimaryColumn({
    name: 'COMPANY_ID',
    type: 'bigint',
    unsigned: true,
  })
  companyID: number;

  @Column({
    name: 'RECRUIT_POS',
  })
  position!: string;

  @Column({
    name: 'RECRUIT_RWD',
  })
  reward!: number;

  @Column({
    name: 'RECRUIT_CNT',
    type: 'longtext',
  })
  contents!: string;

  @Column({
    name: 'SKILL',
  })
  skill!: string;

  static from(createRecruitmentDto: CreateRecruitmentDto) {
    const recruitment = new CreateRecruitmentDto();
    recruitment.companyID = createRecruitmentDto.companyID;
    recruitment.position = createRecruitmentDto.position;
    recruitment.reward = createRecruitmentDto.reward;
    recruitment.contents = createRecruitmentDto.contents;
    recruitment.skill = createRecruitmentDto.skill;

    return recruitment;
  }
}

@Entity({ name: 'APPLICATIONS' })
export class Applications extends Common {
  @PrimaryColumn({
    name: 'USER_ID',
  })
  userID: string;
}
