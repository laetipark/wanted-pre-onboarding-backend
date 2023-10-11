import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private company: Repository<Company>,
  ) {}

  async addCompany(createCompanyDto: CreateCompanyDto) {
    const company = Company.from(createCompanyDto);

    await this.company.save(company);
    return {
      message: '정상적으로 회사를 등록하였습니다.',
      data: company,
    };
  }
}
