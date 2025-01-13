import { Module } from '@nestjs/common';
import { Broker } from '@broker/broker';
import { CoreModule } from '@modules/core/core.module';
import { UtilsController } from './controllers/utils.controller';
import { FetchRolesUsecase } from '@modules/core/usecases/fetchRoles.usecase';

@Module({
  imports: [CoreModule],
  providers: [Broker, FetchRolesUsecase],
  controllers: [UtilsController],
  exports: [],
})
export class UtilsModule {}
