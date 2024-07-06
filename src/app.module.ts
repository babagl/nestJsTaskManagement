import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { typeOrmconfig } from './config/typeorm.config';
@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(typeOrmconfig)],
})
export class AppModule {}
