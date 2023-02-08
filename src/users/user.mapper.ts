import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

export class UserMapper {
  mapUserToDto(user: User): UserDto {
    return {
      userId: user._id,
    };
  }
}