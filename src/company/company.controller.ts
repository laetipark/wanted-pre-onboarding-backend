import { Controller, Post, Put, Query } from '@nestjs/common';
import { CompanyService } from '~/src/company/company.service';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post('')
  async insertCompany(
    @Query('name') name: string,
    @Query('country') country: string,
    @Query('region') region: string,
  ) {
    return await this.companyService.addCompany({
      companyName: name,
      country: country,
      region: region,
    });
  }
}
