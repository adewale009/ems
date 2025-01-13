import { EntityManager, Repository } from 'typeorm';
import { Session } from '@modules/core/entities/session.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SessionRepository extends Repository<Session> {
  private readonly logger = new Logger(SessionRepository.name);

  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly entityManager: EntityManager,
  ) {
    super(sessionRepository.target, sessionRepository.manager, sessionRepository.queryRunner);
  }

  async createSession(sessionData: Partial<Session>): Promise<Session> {
    const session = this.create(sessionData);
    return await this.save(session);
  }

  async getSessionById(id: string): Promise<Session | undefined> {
    return await this.findOne({ where: { id } });
  }

  async getSessionByUserId(userId: string): Promise<Session | undefined> {
    return await this.findOne({ where: { userId } });
  }

  async getSessionByToken(token: string): Promise<Session | undefined> {
    return await this.findOne({ where: { refreshToken: token } });
  }

  async updateSession(id: string, updateData: Partial<Session>): Promise<Session | undefined> {
    await this.update(id, updateData);
    return this.getSessionById(id);
  }
}
