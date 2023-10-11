import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecruitmentController } from './recruitment.controller';
import { RecruitmentService } from './recruitment.service';
import { User } from '~/user/user.entity';
import { Recruitment, Applications } from '~/recruitment/recruitment.entity';
import { Company } from '~/company/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, User, Recruitment, Applications]),
  ],
  controllers: [RecruitmentController],
  providers: [RecruitmentService],
})
export class RecruitmentModule {}
