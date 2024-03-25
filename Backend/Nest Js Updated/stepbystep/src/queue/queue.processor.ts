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

    // Mark the task as success/failure after two minutes
    console.log('The markAfterSeconds function is being executed');
    await this.taskService.markAfterSeconds(taskId);

    // Remove job from queue after markAfterSeconds function has executed
    console.log('Removing job from queue after two minutes');
    await job.remove();
  }
}
