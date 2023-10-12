import { MigrationInterface, QueryRunner } from 'typeorm';

export class Wanted1697116217701 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`company\`
                             (
                                 \`COMPANY_ID\`    int unsigned NOT NULL AUTO_INCREMENT,
                                 \`COMPANY_NM\`    varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
                                 \`COMPANY_CNTRY\` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
                                 \`COMPANY_RGN\`   varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
                                 \`CREATED_AT\`    timestamp                              NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                 \`UPDATED_AT\`    timestamp                              NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                 \`DELETED_AT\`    timestamp NULL,
                                 PRIMARY KEY (\`COMPANY_ID\`)
                             ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`);
    await queryRunner.query(`CREATE TABLE \`user\`
                             (
                                 \`USER_ID\`    varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
                                 \`CREATED_AT\` timestamp                              NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                 \`UPDATED_AT\` timestamp                              NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                 \`DELETED_AT\` timestamp NULL,
                                 PRIMARY KEY (\`USER_ID\`)
                             ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`);
    await queryRunner.query(`CREATE TABLE \`recruitment\`
                             (
                                 \`RECRUIT_ID\`  int unsigned NOT NULL AUTO_INCREMENT,
                                 \`COMPANY_ID\`  int unsigned NOT NULL,
                                 \`RECRUIT_POS\` varchar(30) COLLATE utf8mb4_unicode_ci  NOT NULL,
                                 \`RECRUIT_RWD\` int unsigned NOT NULL,
                                 \`RECRUIT_CNT\` varchar(400) COLLATE utf8mb4_unicode_ci NOT NULL,
                                 \`SKILL\`       varchar(30) COLLATE utf8mb4_unicode_ci  NOT NULL,
                                 \`CREATED_AT\`  timestamp                               NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                 \`UPDATED_AT\`  timestamp                               NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                 PRIMARY KEY (\`RECRUIT_ID\`),
                                 KEY             \`recruitment_FK\` (\`COMPANY_ID\`),
                                 CONSTRAINT \`recruitment_FK\` FOREIGN KEY (\`COMPANY_ID\`) REFERENCES \`company\` (\`COMPANY_ID\`) ON DELETE CASCADE
                             ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`);
    await queryRunner.query(`CREATE TABLE \`applications\`
                             (
                                 \`RECRUIT_ID\` int unsigned NOT NULL,
                                 \`USER_ID\`    varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
                                 \`CREATED_AT\` timestamp                              NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                 \`UPDATED_AT\` timestamp                              NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                 PRIMARY KEY (\`RECRUIT_ID\`, \`USER_ID\`),
                                 KEY            \`applications_FK2\` (\`USER_ID\`),
                                 CONSTRAINT \`applications_FK1\` FOREIGN KEY (\`RECRUIT_ID\`) REFERENCES \`recruitment\` (\`RECRUIT_ID\`) ON DELETE CASCADE,
                                 CONSTRAINT \`applications_FK2\` FOREIGN KEY (\`USER_ID\`) REFERENCES \`user\` (\`USER_ID\`) ON DELETE CASCADE
                             ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`applications\` DROP FOREIGN KEY \`applications_FK1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`applications\` DROP FOREIGN KEY \`applications_FK2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`recruitment\` DROP FOREIGN KEY \`recruitment_FK\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`applications\``);
    await queryRunner.query(`DROP TABLE \`recruitment\``);
    await queryRunner.query(`DROP TABLE \`company\``);
  }
}
