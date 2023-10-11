import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecruitmentController } from './recruitment.controller';
import { RecruitmentService } from './recruitment.service';
import { Applications, Recruitment } from '~/recruitment/recruitment.entity';
import { Company } from '~/company/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Recruitment])],
  controllers: [RecruitmentController],
  providers: [RecruitmentService],
})
export class RecruitmentModule {}
