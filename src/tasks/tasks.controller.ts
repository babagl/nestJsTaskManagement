import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { log } from 'console';
import { CreateTaskDto } from './dto/tasks.dto';
import { Status } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

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

  @Patch(':id')
  UpdateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: Status,
  ): Promise<Task> {
    return this.taskService.UpdateTaskStatus(id, status);
  }

  // /**
  //  * @param id l'id du task au'on veut modifier
  //  * @param status le status qu'on veut modifier
  //  */

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: Status,
  // ): void {
  //   this.taskService.updateTaskStatus(id, status);
  // }
}
