import { Injectable } from '@nestjs/common';
import { Status, Tasks } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Tasks[] = [
    {
      id: 'baba',
      description: 'Task Desc',
      title: 'taskTitle',
      status: Status.DONE,
    },
  ];

  getAllTaks() {
    return this.tasks;
  }
}
