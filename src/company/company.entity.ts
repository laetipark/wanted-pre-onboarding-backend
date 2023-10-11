import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateCompanyDto } from '~/company/dto/create-company.dto';

@Entity({ name: 'COMPANY' })
export class Company {
  @PrimaryGeneratedColumn({
    name: 'COMPANY_ID',
    type: 'bigint',
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

  static from(createCompanyDto: CreateCompanyDto) {
    const company = new Company();
    company.companyName = createCompanyDto.companyName;
    company.country = createCompanyDto.country;
    company.region = createCompanyDto.region;

    return company;
  }
}
