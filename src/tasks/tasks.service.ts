import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/tasks.dto';
import { Status } from './task-status.enum';
import { Task } from './task.entity';
@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(createTaskDTO: CreateTaskDto):Promise<Task>{
    const task = new Task();
    task.title = createTaskDTO.title;
    task.description = createTaskDTO.description;
    task.status = Status.OPEN;
    await task.save();
    return task;
  }
  // private tasks: Tasks[] = [
  //   {
  //     id: 'baba',
  //     description: 'Task Desc',
  //     title: 'taskTitle',
  //     status: Status.DONE,
  //   },
  // ];

  // getAllTaks() {
  //   return this.tasks;
  // }

  // getTaskWithFiltered(filteredDto: GetTaskFilterDto): Tasks[] {
  //   const { status, search } = filteredDto;
  //   let task = this.getAllTaks();
  //   if (status) {
  //     console.log(status);
  //     task = task.filter((t) => t.status === status);
  //   }

  //   if (search) {
  //     console.log(search);
  //     task = task.filter(
  //       (t) => t.title.includes(search) || t.description.includes(search),
  //     );
  //     log(task);
  //   }
  //   return task;
  // }

  async getTaskByID(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id: id } });
    if (!found) {
      throw new NotFoundException(`Taks with ID ${id} "Not found`);
    }
    return found;
  }

 
}
