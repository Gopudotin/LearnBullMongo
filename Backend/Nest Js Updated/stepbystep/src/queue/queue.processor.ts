import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { TaskService } from 'src/tasks/services/tasks/tasks.service'; // Import TaskService

@Processor('taskQueue')
export class QueueProcessor {
  constructor(private readonly taskService: TaskService) {}

  @Process()
  async processJob(job: Job<any>) {
    // Calculate delay
    const scheduledDate = new Date(job.data.scheduledDate);
    const currentTime = Date.now();
    console.log(`Scheduled Date: ${scheduledDate}`);
    console.log(`Current Time: ${new Date(currentTime)}`);

    const delay = scheduledDate.getTime() - currentTime;
    console.log(`Delay: ${delay}`);

    // If delay is greater than 0, wait until the scheduled date
    if (delay > 0) {
      console.log('Delay is greater than 0. Waiting...');
      await new Promise((resolve) => setTimeout(resolve, delay));
      console.log('Finished waiting.');
    } else {
      console.log(
        'No delay. Scheduled time is in the past or very close to current time.',
      );
    }

    // Update the task status to "in progress" in the database
    const taskId = job.data._id;
    await this.taskService.markAsInProgress(taskId);

    // Log the processed job
    console.log('Processing job:', job.data);

    // Log the queue contents
    const queue = await job.queue.getJob(job.id);
    console.log('Queue:', queue);
  }
}
