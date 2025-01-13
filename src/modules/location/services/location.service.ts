import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { StateRepository } from '@adapters/repositories/state.repository';

@Injectable()
export class LocationService {
  private logger = new Logger(LocationService.name);

  constructor(private readonly stateRepository: StateRepository) {}

  async validateLocation(
    stateId: string,
    localGovernmentId: string,
    areaId: string,
  ): Promise<void> {
    const state = await this.stateRepository.getStateWithLgaIdAndAreaById(
      stateId,
      localGovernmentId,
      areaId,
    );

    if (state) {
      return;
    } else {
      throw new BadRequestException('Invalid location');
    }
  }
}
