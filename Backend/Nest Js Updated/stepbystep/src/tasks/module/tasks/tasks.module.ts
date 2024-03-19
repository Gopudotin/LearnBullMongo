// tasks.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from 'src/tasks/controllers/tasks/tasks.controller';
import { TaskService } from 'src/tasks/services/tasks/tasks.service';
import { Task, TaskSchema } from 'src/tasks/Model/task.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TasksModule {}
