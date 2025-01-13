import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

@Injectable()
export class SignOutDto {
  @ApiProperty({
    type: 'string',
    example: 'b3c3f29b-5d0e-4d3d-8cf1-9a2f0e3d40de',
    description: 'UUID of the user signing out',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
