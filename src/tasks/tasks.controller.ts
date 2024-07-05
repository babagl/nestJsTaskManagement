import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { log } from 'console';
import { CreateTaskDto } from './dto/tasks.dto';
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
  AddTasks(@Body() createTaskDTO: CreateTaskDto) {
    return this.taskService.createTask(createTaskDTO);
  }

  @Get('/:id')
  getTask(@Param('id') id: string): Tasks {
    log(id);
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  removeTask(@Param('id') id: string): void {
    log(id);
    this.taskService.deleteTaskById(id);
  }

  @Put('/:id')
  updateTask(
    @Param('id') id: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Tasks[] {
    log('id', id, 'task', 'TaksDto', createTaskDto);
    return this.taskService.updateTask(id, createTaskDto);
  }
}
