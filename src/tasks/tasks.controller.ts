import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { log } from 'console';
import { GetTaskFilterDto } from './dto/get_tasks_filtered.dto';
import { CreateTaskDto } from './dto/tasks.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validations.pipes';
import { Status } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  /**
   */
  @Get()
  getTasks(@Query(ValidationPipe) filerDto: GetTaskFilterDto) {
    return this.taskService.getTasks(filerDto);
  }
  /**
   * @param id l'id de task qu'on veut voir
   * @returns renvoie le task selectionner de par son id
   */
  @Get('/:id')
  getTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    log(id);
    return this.taskService.getTaskByID(id);
  }

  /**
   * @param createTaskDto task
   * @returns task created
   */
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    log(createTaskDto);
    return this.taskService.createTask(createTaskDto);
  }
  /**
   * @param id Supprimer la tache selectionner par son id
   */
  @Delete('/:id')
  removeTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    log(id);
    return this.taskService.deleteTaskByID(id);
  }

  /**
   * @param id
   * @Body TaskValidation
   */
  @Patch(':id')
  UpdateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: Status,
  ): Promise<Task> {
    return this.taskService.UpdateTaskStatus(id, status);
  }
}
