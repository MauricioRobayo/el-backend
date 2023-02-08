import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.entity';

@Schema({ timestamps: true })
export class Note extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: User;

  @Prop({ required: true })
  readonly title: string;

  @Prop()
  readonly description: string;

  @Prop()
  readonly imageUrl: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
