import { Controller, Post, Body } from '@nestjs/common';
import { CompanyService } from '~/src/company/company.service';
import { CreateCompanyDto } from '~/company/dto/create-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  async insertCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return await this.companyService.addCompany(createCompanyDto);
  }
}
