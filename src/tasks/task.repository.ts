import { DataSource } from 'typeorm';
import { Task } from './task.entity';

export const TaskRepository = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
    inject: ['DATA_SOURCE'],
  },
];
