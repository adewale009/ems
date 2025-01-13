import { Broker } from '@broker/broker';
import { CoreModule } from '@modules/core/core.module';
import { Module } from '@nestjs/common';
import { PropertiesController } from './controllers/property.controller';
import { ListPropertyUsecase } from './usecases/listProperty.usecase';
import { FilterModule } from '@modules/filters/filters.module';
import { PropertyService } from './services/property.service';
import { Property } from '@modules/core/entities/property.entity';
import { PropertyRepository } from '@adapters/repositories/property.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from '@modules/location/location.module';

@Module({
  imports: [TypeOrmModule.forFeature([Property]), CoreModule, FilterModule, LocationModule],
  providers: [Broker, ListPropertyUsecase, PropertyService, PropertyRepository],
  controllers: [PropertiesController],
  exports: [],
})
export class PropertyModule {}
