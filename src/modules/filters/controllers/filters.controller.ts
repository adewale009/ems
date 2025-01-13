import { Controller, Logger } from '@nestjs/common';

@Controller('properties')
export class FilterController {
  private readonly logger = new Logger(FilterController.name);

  constructor() {}
}
