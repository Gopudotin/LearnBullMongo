import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from 'src/tasks/controllers/tasks/tasks.controller';
import { TaskService } from 'src/tasks/services/tasks/tasks.service';
import { Task, TaskSchema } from 'src/tasks/Model/task.model';
import { QueueModule } from 'src/queue/queue.module'; // Import QueueModule
import { BullModule } from '@nestjs/bull'; // Import BullModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    QueueModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'taskQueue',
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TasksModule {}
