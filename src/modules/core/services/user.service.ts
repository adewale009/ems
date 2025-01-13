import { UserRepository } from '@adapters/repositories/user.repository';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { FindOneOptions } from 'typeorm';
import { HashingUtil } from '@shared/utils/hashing/hashing.utils';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashingUtil: HashingUtil,
  ) {}

  async createUser(userData: Partial<User>): Promise<User> {
    await this.findUserAndFailIfExist(userData);
    return this.userRepository.createUser({
      ...userData,
      password: await this.hashingUtil.hash(userData.password),
    });
  }

  async getUserById(id: FindOneOptions<User>): Promise<User | undefined> {
    return await this.userRepository.getUserById(id);
  }

  async findUserAndFailIfExist(
    userData: Partial<Pick<User, 'id' | 'email' | 'phoneNumber'>>,
  ): Promise<void> {
    const user = await this.userRepository.getUserByData(userData);
    if (user) {
      if (userData?.id) {
        this.logger.error(`This user already exists`);
        throw new BadRequestException(`This user already exists`);
      }
      if (userData?.email || userData?.phoneNumber) {
        if (user.email === userData.email) {
          this.logger.error('This email is already in use');
          throw new BadRequestException('This email is already in use');
        } else {
          this.logger.error('This phone number is already in use');
          throw new BadRequestException('This phone number is already in use');
        }
      }
    }
  }

  async findUserAndFailIfNotExist(
    userData: Partial<Pick<User, 'id' | 'email' | 'phoneNumber'>>,
  ): Promise<User> {
    const user = await this.userRepository.getUserByData(userData);
    if (!user) {
      this.logger.error(`User not found`);
      throw new BadRequestException(`User not found`);
    }

    return user;
  }

  async updateUserByEmail(userData: Partial<User>): Promise<User> {
    const user = await this.findUserAndFailIfNotExist({ email: userData.email });
    const updateUserData = await this.userRepository.updateUser(
      user.id as FindOneOptions<User>,
      userData,
    );

    return updateUserData;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  async updateSignOutTimestamp(id: FindOneOptions<any>, updateData: Partial<any>): Promise<void> {
    const user = await this.userRepository.updateUser(id, updateData);
    if (!user) {
      throw new Error('Failed to update sign-out timestamp');
    }
  }
}
