import { DataSource } from 'typeorm';
import { User } from './user.entity';

export const UserRepository = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
