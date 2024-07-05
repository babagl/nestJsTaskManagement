import { Injectable } from '@nestjs/common';

import * as uuid from 'uid';
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

  createTask(title: string, description: string) {
    const task: Tasks = {
      id:uuid.uid(3),
      title,
      description,
      status: Status.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
