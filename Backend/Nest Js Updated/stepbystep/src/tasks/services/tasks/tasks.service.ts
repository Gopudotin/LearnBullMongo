import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/tasks/Model/task.model';
import { QueueProducer } from 'src/queue/queue.producer';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    private readonly queueProducer: QueueProducer,
  ) {}

  async create(taskData: Partial<Task>): Promise<Task> {
    // Get the scheduled date
    const scheduledDate = new Date(taskData.scheduledDate);
    const currentTime = new Date();

    console.log(`The scheduled date is ${scheduledDate}`);
    console.log(`The Current time is ${currentTime}`);

    // Check if the scheduled date is in the future
    if (scheduledDate <= currentTime) {
      console.log(
        'Scheduled date has already passed. Task will not be added to queue.',
      );
      throw new Error(
        'Scheduled date has already passed. Task will not be added to queue.',
      );
    }

    // Create and save task to database
    const createdTask = new this.taskModel(taskData);
    const savedTask = await createdTask.save();

    // Calculate delay until scheduled date
    const delay = scheduledDate.getTime() - currentTime.getTime();
    console.log(delay);

    // Add task to queue after the delay
    setTimeout(async () => {
      await this.queueProducer.addJob(savedTask.toJSON());
      console.log('Task added to queue. Waiting for scheduled date...');
    }, delay);

    return savedTask;
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

  async update(id: string, updateData: Partial<Task>): Promise<Task> {
    const task = await this.taskModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async remove(id: string): Promise<Task> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      throw new NotFoundException('Task not found');
    }

    return deletedTask;
  }

  async markAsStarted(id: string, completionDate: Date): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(
      id,
      { completionDate },
      { new: true },
    );
  }

  async markErrorOccurred(id: string, errorOccurredDate: Date): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(
      id,
      { errorOccurredDate },
      { new: true },
    );
  }

  async markAsInProgress(id: string): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      id,
      { currentStatus: 'in progress' },
      { new: true },
    );

    if (!updatedTask) {
      throw new NotFoundException('Task not found');
    }

    return updatedTask;
  }

  async markAsSuccess(id: string): Promise<Task> {
    const completionDate = new Date(); // Get the current date and time
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      id,
      {
        currentStatus: 'success',
        completionDate: completionDate,
      },
      { new: true },
    );

    if (!updatedTask) {
      throw new NotFoundException('Task not found');
    }
    console.log(
      `Updating completionDate for task with ID ${id} to current date and time: ${completionDate.toISOString()}`,
    );
    return updatedTask;
  }

  async markAsFailure(id: string): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(
      id,
      { currentStatus: 'failure' },
      { new: true },
    );
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async markAfterTwoMinutes(id: string) {
    console.log(
      `Waiting for two minutes before processing task with ID: ${id}`,
    );
    //await this.delay(120000); // Wait for two minutes
    await this.delay(20000);

    console.log(`Two minutes have passed. Processing task with ID: ${id}`);
    const task = await this.taskModel.findById(id).exec();
    if (task.payload === 'success') {
      console.log(`Task with ID ${id} payload is success. Marking as success.`);
      await this.markAsSuccess(id);
      // Update the completionDate to the current date and time
      await this.taskModel.findByIdAndUpdate(
        id,
        { completionDate: new Date() },
        { new: true },
      );
    } else if (task.payload === 'failure') {
      console.log(`Task with ID ${id} payload is failure. Marking as failure.`);
      await this.markAsFailure(id);
    }
  }
}
