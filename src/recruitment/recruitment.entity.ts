import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '~/company/company.entity';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';

@Entity({ name: 'RECRUITMENT' })
export class Recruitment {
  @PrimaryGeneratedColumn({
    name: 'RECRUIT_ID',
    unsigned: true,
  })
  recruitID: number;

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

  @CreateDateColumn({
    name: 'CREATED_AT',
    select: false,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'UPDATED_AT',
    select: false,
  })
  updatedAt!: Date;

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
export class Applications {
  @PrimaryColumn({
    name: 'RECRUIT_ID',
    unsigned: true,
  })
  recruitID: number;

  @PrimaryColumn({
    name: 'USER_ID',
  })
  userID: string;

  @CreateDateColumn({
    name: 'CREATED_AT',
    select: false,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'UPDATED_AT',
    select: false,
  })
  updatedAt!: Date;
}
