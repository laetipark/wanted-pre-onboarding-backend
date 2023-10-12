import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Relation,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Recruitment } from '~/recruitment/recruitment.entity';
import { CreateCompanyDto } from '~/company/dto/create-company.dto';

@Entity({ name: 'COMPANY' })
export class Company {
  @PrimaryGeneratedColumn({
    name: 'COMPANY_ID',
    unsigned: true,
  })
  companyID: number;

  @Column({
    name: 'COMPANY_NM',
  })
  companyName: string;

  @Column({
    name: 'COMPANY_CNTRY',
  })
  country: string;

  @Column({
    name: 'COMPANY_RGN',
  })
  region: string;

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

  @DeleteDateColumn({
    name: 'DELETED_AT',
    select: false,
    nullable: true,
  })
  deletedAt!: Date | null;

  static from(createCompanyDto: CreateCompanyDto) {
    const company = new Company();
    company.companyName = createCompanyDto.companyName;
    company.country = createCompanyDto.country;
    company.region = createCompanyDto.region;

    return company;
  }

  @OneToMany(() => Recruitment, (item) => item.company)
  recruitments: Relation<Recruitment[]>;
}
