import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.entity';
import { Movie } from '../../movies/entities/movie.entity';

@Schema({ timestamps: true })
export class Favorite extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ required: true, type: Movie })
  readonly movie: Movie;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
