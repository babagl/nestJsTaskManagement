import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { log } from 'console';
import { Repository } from 'typeorm';
import { GetTaskFilterDto } from './dto/get_tasks_filtered.dto';
import { CreateTaskDto } from './dto/tasks.dto';
import { Status } from './task-status.enum';
import { Task } from './task.entity';
@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
  ) {}
  
  async getTasks(filerDto: GetTaskFilterDto){
    const {status, search} = filerDto;
    const query = this.taskRepository.createQueryBuilder('task')
    if (status) {
      query.andWhere('task.status = :status', {status})
    }
    if (search) {Task
      query.andWhere('task.status LIKE :search OR task.description LIKE :search',{search: `%${search}%`})
    }
    const tasks = await query.getMany();
    return tasks;
    
  }

  async createTask(createTaskDTO: CreateTaskDto):Promise<Task>{
    const task = new Task();
    task.title = createTaskDTO.title;
    task.description = createTaskDTO.description;
    task.status = Status.OPEN;
    await task.save();
    return task;
  }

  async UpdateTaskStatus(id: number, status: Status): Promise<Task> {
    const task = await this.getTaskByID(id);
    task.status = status;
    log(task);
    task.save();
    return task;
  }
  
  async deleteTaskByID(id: number): Promise<void>{
    const result = await this.taskRepository.delete(id);
    log(result)
    if (!result.affected) {
      throw new NotFoundException(`task with id ${id} not found`)
    }
   
  }

  async getTaskByID(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id: id } });
    if (!found) {
      throw new NotFoundException(`Taks with ID ${id} "Not found`);
    }
    return found;
  }

 
}
