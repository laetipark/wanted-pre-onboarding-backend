import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company } from '~/src/company/company.entity';
import { Recruitment } from '~/recruitment/recruitment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Recruitment])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
