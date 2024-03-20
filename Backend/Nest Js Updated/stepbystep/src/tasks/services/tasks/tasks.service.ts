// tasks/services/task.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/tasks/Model/task.model';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectQueue('taskQueue') private taskQueue: Queue,
  ) {}

  async create(taskData: Partial<Task>): Promise<Task> {
    const createdTask = new this.taskModel(taskData);
    const savedTask = await createdTask.save();
    await this.taskQueue.add(savedTask.toJSON()); // Pass savedTask data to queue
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

  async markAsStarted(id: string, startDate: Date): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, { startDate }, { new: true });
  }

  async markErrorOccurred(id: string, errorOccurredDate: Date): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(
      id,
      { errorOccurredDate },
      { new: true },
    );
  }
}
