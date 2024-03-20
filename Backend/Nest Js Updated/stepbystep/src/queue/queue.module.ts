// queue/queue.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueProcessor } from './queue.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'taskQueue',
    }),
  ],
  providers: [QueueProcessor],
})
export class QueueModule {}
