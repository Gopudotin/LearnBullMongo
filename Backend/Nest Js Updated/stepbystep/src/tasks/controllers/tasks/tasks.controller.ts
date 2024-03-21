// tasks/controllers/task.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TaskService } from 'src/tasks/services/tasks/tasks.service';
import { Task } from 'src/tasks/Model/task.model';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: Partial<Task>) {
    createTaskDto.scheduledDate = new Date(createTaskDto.scheduledDate);
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: Partial<Task>) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }

  @Put(':id/start')
  markAsStarted(
    @Param('id') id: string,
    @Body('completionDate') completionDate: Date,
  ) {
    return this.taskService.markAsStarted(id, completionDate);
  }

  @Put(':id/error')
  markErrorOccurred(
    @Param('id') id: string,
    @Body('errorOccurredDate') errorOccurredDate: Date,
  ) {
    return this.taskService.markErrorOccurred(id, errorOccurredDate);
  }

  @Put(':id/inprogress') // Define new endpoint for marking task as in progress
  markAsInProgress(@Param('id') id: string) {
    return this.taskService.markAsInProgress(id);
  }
}
