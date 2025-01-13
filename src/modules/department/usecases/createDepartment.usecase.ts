import { DepartmentService } from '../services/department.service';
import { CreateDepartmentDto } from '../dtos/createDepartment.dto';
import { Injectable, Logger } from '@nestjs/common';
import { Usecase } from '@broker/types';

@Injectable()
export class CreateDepartmentUsecase extends Usecase {
  private readonly logger = new Logger(CreateDepartmentUsecase.name);

  constructor(private readonly departmentService: DepartmentService) {
    super();
  }

  async execute(createDepartmentDto: CreateDepartmentDto) {
    this.logger.log('Executing CreateDepartmentUsecase');
    return this.departmentService.createDepartment(createDepartmentDto);
  }
}
