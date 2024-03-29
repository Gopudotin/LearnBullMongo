import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Enable timestamps
export class Task extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ default: Date.now })
  scheduledDate: Date;

  @Prop({ default: 'pending' })
  currentStatus: string;

  @Prop({ default: '' })
  errorType: string;

  @Prop({ default: '' })
  errorDescription: string;

  @Prop({ default: null, select: true }) // Include in the response by default
  completionDate: Date;

  @Prop({ default: '', select: true }) // Include in the response by default
  errorOccurredDate: Date;

  @Prop({ default: '' }) // Payload field
  payload: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

export type TaskDocument = Task & Document;
