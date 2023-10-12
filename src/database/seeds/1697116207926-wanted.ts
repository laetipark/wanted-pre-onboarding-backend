import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '~/user/user.entity';
import { Company } from '~/company/company.entity';

const users = [
  {
    userID: 'creator98@naver.com',
  },
  {
    userID: 'creator0205@gmail.com',
  },
  {
    userID: 'creator98@outlook.kr',
  },
  {
    userID: 'creator98@kakao.com',
  },
];

const companies = [
  {
    companyID: 1,
    companyName: '원티드랩',
    country: '한국',
    region: '서울',
  },
  {
    companyID: 2,
    companyName: '카카오',
    country: '한국',
    region: '판교',
  },
  {
    companyID: 3,
    companyName: '네이버',
    country: '한국',
    region: '판교',
  },
];

export class Wanted1697116207926 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(User, users);
    await queryRunner.manager.save(Company, companies);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      users.map((seed) =>
        queryRunner.manager.delete(User, { userID: seed.userID }),
      ),
    );
    await Promise.all(
      companies.map((seed) =>
        queryRunner.manager.delete(Company, { companyID: seed.companyID }),
      ),
    );
  }
}
