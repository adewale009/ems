import { User } from '@modules/core/entities/user.entity';
import { UserService } from '@modules/core/services/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingUtil } from '@shared/utils/hashing/hashing.utils';

type AuthParams = {
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingUtil: HashingUtil,
    private readonly userService: UserService,
  ) {}

  async authorize(id: string): Promise<User | null> {
    const user = await this.userService.findUserAndFailIfNotExist({ id });
    if (user) {
      delete user.password;
      return user;
    }

    return null;
  }

  async authenticate(authParams: AuthParams): Promise<User> {
    const user = await this.findUserByEmail(authParams.email);
    await this.validatePassword(user, authParams.password);
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async validatePassword(user: User, password: string): Promise<void> {
    const isPasswordValid = await this.hashingUtil.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
