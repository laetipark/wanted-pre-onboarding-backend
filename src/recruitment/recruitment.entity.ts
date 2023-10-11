import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';
import { Company } from '~/company/company.entity';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { CreateApplicationDto } from '~/recruitment/dto/create-application.dto';

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
  content!: string;

  @Column({
    name: 'SKILL',
  })
  skill!: string;

  static from(createRecruitmentDto: CreateRecruitmentDto) {
    const recruitment = new CreateRecruitmentDto();
    recruitment.companyID = createRecruitmentDto.companyID;
    recruitment.position = createRecruitmentDto.position;
    recruitment.reward = createRecruitmentDto.reward;
    recruitment.content = createRecruitmentDto.content;
    recruitment.skill = createRecruitmentDto.skill;

    return recruitment;
  }

  @ManyToOne(() => Company, (item) => item.recruitments)
  @JoinColumn({ name: 'COMPANY_ID', referencedColumnName: 'companyID' })
  company: Relation<Company>;
}

@Entity({ name: 'APPLICATIONS' })
export class Applications extends Common {
  @PrimaryColumn({
    name: 'USER_ID',
  })
  userID: string;
}
