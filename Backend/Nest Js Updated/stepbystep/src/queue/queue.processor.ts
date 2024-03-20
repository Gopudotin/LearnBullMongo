// queue/queue.processor.ts
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('taskQueue')
export class QueueProcessor {
  @Process()
  async processJob(job: Job<any>) {
    // Your job processing logic goes here
    console.log('Processing job:', job.data);

     // Log the queue contents
     const queue = await job.queue.getJob(job.id);
     console.log('Queue:', queue);
  }
}
