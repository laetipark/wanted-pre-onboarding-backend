import { config } from 'dotenv';

config();
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  timezone: '+09:00',
  entities: ['dist/**/**/*.entity.{ts,js}'],
  synchronize: false,
  migrationsTableName: 'migration',
  migrations: [`dist/database/${process.env.MIGRATION_TYPE}/*{.ts,.js}`],
});
