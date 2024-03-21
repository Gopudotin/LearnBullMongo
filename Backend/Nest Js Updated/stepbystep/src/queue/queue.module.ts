import { Module, forwardRef } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueProcessor } from './queue.processor';
import { TasksModule } from 'src/tasks/module/tasks/tasks.module';

@Module({
  imports: [
    forwardRef(() => TasksModule), 
    BullModule.registerQueue({
      name: 'taskQueue',
    }),
  ],
  providers: [QueueProcessor],
})
export class QueueModule {}
