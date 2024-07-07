import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { log } from 'console';
import { CreateTaskDto } from './dto/tasks.dto';
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
  // /**
  //  * @param id Supprimer la tache selectionner par son id
  //  */
  // @Delete('/:id')
  // removeTask(@Param('id') id: string): void {
  //   log(id);
  //   this.taskService.deleteTaskById(id);
  // }

  // /**
  //  * @param id de l'element selectionne
  //  * @param createTaskDto le task qu'on veut creer
  //  * @returns le liste de toutes les tasks apres modif
  //  */
  // @Put('/:id')
  // updateTask(
  //   @Param('id') id: string,
  //   @Body() createTaskDto: CreateTaskDto,
  // ): Tasks[] {
  //   log('id', id, 'task', 'TaksDto', createTaskDto);
  //   return this.taskService.updateTask(id, createTaskDto);
  // }
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
