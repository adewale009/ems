import { Broker } from '@broker/broker';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationService } from './services/location.service';
import { Area } from '@modules/core/entities/area.entity';
import { State } from '@modules/core/entities/state.entity';
import { LocalGovernment } from '@modules/core/entities/localGovernment.entity';
import { StateRepository } from '@adapters/repositories/state.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Area, State, LocalGovernment])],
  providers: [Broker, LocationService, StateRepository],
  controllers: [],
  exports: [LocationService],
})
export class LocationModule {}
