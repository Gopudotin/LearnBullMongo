import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Task } from 'src/tasks/Model/task.model';

@Injectable()
export class QueueProducer {
  constructor(@InjectQueue('taskQueue') private readonly taskQueue: Queue) {}

  // Add job to the queue
  async addJob(taskData: Task) {
    const job = await this.taskQueue.add(taskData);
    console.log(`Job added to queue: ${JSON.stringify(job.data)}`);
    return job;
  }
}
