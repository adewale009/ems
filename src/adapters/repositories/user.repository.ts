import { EntityManager, FindOneOptions, Repository } from 'typeorm';
import { User } from '@modules/core/entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  private readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {
    super(userRepository.target, userRepository.manager, userRepository.queryRunner);
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.create(userData);
    return await this.save(user);
  }

  async getUserById(id: FindOneOptions<User>): Promise<User | undefined> {
    return await this.findOne({ where: { id: id as string } });
  }

  async updateUser(id: FindOneOptions<User>, updateData: Partial<User>): Promise<User | undefined> {
    await this.update(id as string, updateData);
    return this.getUserById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.find();
  }

  async getUserByData(
    userData: Partial<Pick<User, 'id' | 'email' | 'phoneNumber'>>,
  ): Promise<User> {
    return this.findOne({
      where: [
        { email: userData?.email },
        { phoneNumber: userData?.phoneNumber },
        { id: userData?.id },
      ],
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email: email } });
  }
}
