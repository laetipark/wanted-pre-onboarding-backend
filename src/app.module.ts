import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './company/company.module';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { UserModule } from './user/user.module';

import DataSource from './configs/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: DataSource,
    }),
    CompanyModule,
    RecruitmentModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
