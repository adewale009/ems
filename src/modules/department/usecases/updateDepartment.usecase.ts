import { DepartmentService } from '../services/department.service';
import { UpdateDepartmentDto } from '../dtos/updateDepartment.dto';
import { Injectable, Logger } from '@nestjs/common';
import { Usecase } from '@broker/types';

@Injectable()
export class UpdateDepartmentUsecase extends Usecase {
  private readonly logger = new Logger(UpdateDepartmentUsecase.name);

  constructor(private readonly departmentService: DepartmentService) {
    super();
  }

  async execute(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    this.logger.log('Executing UpdateDepartmentUsecase');
    return this.departmentService.updateDepartment(id, updateDepartmentDto);
  }
}
