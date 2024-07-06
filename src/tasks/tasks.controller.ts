import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { log } from 'console';
import { GetTaskFilterDto } from './dto/get_tasks_filtered.dto';
import { CreateTaskDto } from './dto/tasks.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validations.pipes';
import { Status, Tasks } from './tasks.model';
import { TasksService } from './tasks.service';
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  /**
   *
   * @returns la liste des tasks
   */
  @Get()
  getTasks(@Query(ValidationPipe) filteredDto: GetTaskFilterDto): Tasks[] {
    log(filteredDto);
    if (Object.keys(filteredDto).length) {
      return this.taskService.getTaskWithFiltered(filteredDto);
    } else {
      return this.taskService.getAllTaks();
    }
  }
  /**
   * @param createTaskDTO prend en parametre les requettes que l'utilisateur a creer et renvoie le task cree
   * @returns le task cree
   */
  @Post()
  @UsePipes(ValidationPipe)
  AddTasks(@Body() createTaskDTO: CreateTaskDto): Tasks {
    return this.taskService.createTask(createTaskDTO);
  }
  /**
   * @param id l'id de task qu'on veut voir
   * @returns renvoie le task selectionner de par son id
   */
  @Get('/:id')
  getTask(@Param('id') id: string): Tasks {
    log(id);
    return this.taskService.getTaskById(id);
  }
  /**
   * @param id Supprimer la tache selectionner par son id
   */
  @Delete('/:id')
  removeTask(@Param('id') id: string): void {
    log(id);
    this.taskService.deleteTaskById(id);
  }

  /**
   * @param id de l'element selectionne
   * @param createTaskDto le task qu'on veut creer
   * @returns le liste de toutes les tasks apres modif
   */
  @Put('/:id')
  updateTask(
    @Param('id') id: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Tasks[] {
    log('id', id, 'task', 'TaksDto', createTaskDto);
    return this.taskService.updateTask(id, createTaskDto);
  }
  /**
   * @param id l'id du task au'on veut modifier
   * @param status le status qu'on veut modifier
   */

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: Status,
  ): void {
    this.taskService.updateTaskStatus(id, status);
  }
}
