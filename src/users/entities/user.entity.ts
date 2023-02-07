import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop([String])
  favorites: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
