import { Body, Controller, Get, Post } from '@nestjs/common';
import { Tasks } from './tasks.model';
import { TasksService } from './tasks.service';
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Tasks[] {
    return this.taskService.getAllTaks();
  }

  @Post()
  AddTasks(
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    return this.taskService.createTask(title, description);
  }
}
