import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { TaskService } from 'src/tasks/services/tasks/tasks.service';

@Processor('taskQueue')
export class QueueProcessor {
  constructor(private readonly taskService: TaskService) {}

  @Process()
  async processJob(job: Job<any>) {
    // Process job immediately
    await this.handleJob(job);
  }

  private async handleJob(job: Job<any>) {
    // Update the task status to "in progress" in the database
    const taskId = job.data._id;
    await this.taskService.markAsInProgress(taskId);

    // Log the processed job
    console.log('Processing job:', job.data);

    // Remove job from queue (optional, depending on your requirements)
    await job.remove();
  }
}
