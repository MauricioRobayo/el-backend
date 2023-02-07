import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Movie } from '../../movies/entities/movie.entity';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  favorites?: Movie[];
}

export const UserSchema = SchemaFactory.createForClass(User);
