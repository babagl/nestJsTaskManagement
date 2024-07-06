import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database.module';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [...TaskRepository, TasksService],
})
export class TasksModule {}
