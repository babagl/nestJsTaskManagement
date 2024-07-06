import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'hussein',
  password: 'tr6nsformers',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.ts'],
  synchronize: true,
};
