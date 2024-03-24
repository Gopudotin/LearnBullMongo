import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from 'src/tasks/controllers/tasks/tasks.controller';
import { TaskService } from 'src/tasks/services/tasks/tasks.service';
import { Task, TaskSchema } from 'src/tasks/Model/task.model';
import { QueueModule } from 'src/queue/queue.module';
import { BullModule } from '@nestjs/bull';
import { QueueProducer } from 'src/queue/queue.producer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    forwardRef(() => QueueModule), // Use forwardRef() here
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
  providers: [TaskService, QueueProducer],
  exports: [TaskService],
})
export class TasksModule {}
