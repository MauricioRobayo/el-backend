import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class UserDto {
  @Transform((param) => param.obj._id)
  @IsString()
  userId: string;
}
