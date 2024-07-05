import { Injectable } from '@nestjs/common';

import { log } from 'console';
import * as uuid from 'uid';
import { CreateTaskDto } from './dto/tasks.dto';
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

  getTaskById(id: string): Tasks {
    log(this.tasks.find((t) => t.id === id));
    return this.tasks.find((t) => t.id === id);
  }

  createTask(createTaskDTO: CreateTaskDto) {
    const { title, description } = createTaskDTO;
    const task: Tasks = {
      id: uuid.uid(3),
      title,
      description,
      status: Status.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string) {
    const indexTask = this.tasks.indexOf(this.tasks.find((t) => t.id === id));
    console.log('Task a supprimer', indexTask);
    this.tasks.splice(indexTask);
  }

  updateTask(id: string, _createTaskDto: CreateTaskDto): Tasks[] {
    const task = {
      id: id,
      ..._createTaskDto,
      status: Status.OPEN,
    };
    const indexTask = this.tasks.indexOf(this.tasks.find((t) => t.id === id));
    this.tasks[indexTask] = task;
    return this.tasks;
  }
}
