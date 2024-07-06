import { Injectable, NotFoundException } from '@nestjs/common';

import { log } from 'console';
import * as uuid from 'uid';
import { GetTaskFilterDto } from './dto/get_tasks_filtered.dto';
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

  getTaskWithFiltered(filteredDto: GetTaskFilterDto): Tasks[] {
    const { status, search } = filteredDto;
    let task = this.getAllTaks();
    if (status) {
      console.log(status);
      task = task.filter((t) => t.status === status);
    }

    if (search) {
      console.log(search);
      task = task.filter(
        (t) => t.title.includes(search) || t.description.includes(search),
      );
      log(task);
    }
    return task;
  }

  getTaskById(id: string): Tasks {
    log(this.tasks.find((t) => t.id === id));
    const found = this.tasks.find((t) => t.id === id);
    if (!found) {
      throw new NotFoundException(`task qui a l'id : ${id} n'existe pas`);
    }
    return found;
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
    const found = this.getTaskById(id);
    if (!found) {
      throw new NotFoundException(`task avec l'id : ${id} n'existe pas`);
    }
    this.tasks = this.tasks.filter((t) => t.id !== found.id);
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

  updateTaskStatus(id: string, status: Status): Tasks[] {
    const task = this.getTaskById(id);
    task.status = status;
    return this.tasks;
  }
}
