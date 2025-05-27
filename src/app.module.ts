import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configSchema from '@config/schema.config';
import common from '@config/common.config';
import typeorm from '@config/typeorm.config';
import { Broker } from '@broker/broker';
import { UtilsModule } from '@modules/utils/util.module';
import { OnboardingModule } from '@modules/onboarding/onboarding.module';
import { AuthModule } from '@modules/auth/auth.module';
import { JwtAuthGuard } from '@modules/auth/guards/jwtAuth.guard';
import { APP_GUARD } from '@nestjs/core';
// import { FilterModule } from '@modules/filters/filters.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { DepartmentModule } from './modules/department/department.module';
import { CoreModule } from '@modules/core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [common, typeorm],
      ...configSchema,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get('typeorm'),
    }),
    UtilsModule,
    OnboardingModule,
    AuthModule,
    /*FilterModule,*/
    EmployeeModule,
    CoreModule,
    DepartmentModule,
  ],
  controllers: [],
  providers: [
    Broker,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [Broker],
})
export class AppModule {}
