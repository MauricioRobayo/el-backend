import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop([String])
  favorites: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
