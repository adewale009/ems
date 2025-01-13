import { ListngStatus } from '@modules/core/entities/property.entity';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsOptional,
  IsNumber,
  IsEnum,
  IsUUID,
  IsObject,
  IsLatitude,
  IsLongitude,
  IsUrl,
} from 'class-validator';

enum RentType {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
  DAILY = 'daily',
}

@Injectable()
export class ListPropertyDto {
  @ApiProperty({
    type: 'string',
    example: 'DRAFT',
    description: 'if use save lisiting as draft, this should indicate draft',
  })
  @IsOptional()
  @IsEnum(ListngStatus)
  status: ListngStatus.DRAFT;

  @ApiProperty({
    type: 'string',
    example: 'Massive Duplex',
    description: 'Property title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: 'string',
    example: 'b7bcef79-c204-447d-9336-e277b114a5e2',
    description: 'ID of the selected property type',
  })
  @IsUUID()
  propertyTypeId: string;

  @ApiProperty({
    type: 'string',
    example: 'b7bcef79-c204-447d-9336-e277b114a5e2',
    description: 'ID of the selected purpose of property',
  })
  @IsUUID()
  purposeId: string;

  @ApiProperty({
    type: 'string',
    example: 'b7bcef79-c204-447d-9336-e277b114a5e2',
    description: 'ID of the selected property state',
  })
  @IsUUID()
  stateId: string;

  @ApiProperty({
    type: 'string',
    example: 'b7bcef79-c204-447d-9336-e277b114a5e2',
    description: 'ID of the selected local government',
  })
  @IsUUID()
  lgaId: string;

  @ApiProperty({
    type: 'string',
    example: 'b7bcef79-c204-447d-9336-e277b114a5e2',
    description: 'ID of the selected property area',
  })
  @IsUUID()
  areaId: string;

  @ApiProperty({
    type: 'string',
    example: '24, Gwarinpa Avenuee, Gwarinpa, Abuja',
    description: 'address of the property',
  })
  @IsString()
  address: string;

  @ApiProperty({
    type: 'string',
    example: '24.44',
    description: 'longittude of the property',
  })
  @IsLongitude()
  long: string;

  @ApiProperty({
    type: 'string',
    example: '-12.44',
    description: 'latitude of the property',
  })
  @IsLatitude()
  lat: string;

  @ApiProperty({
    type: 'array',
    example:
      '["https://images.unsplash.com/photo-1506126279646-a697353d3166?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2UlMjBleHRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D"]',
    description: 'images urls of the property',
  })
  @IsArray()
  @IsUrl({}, { each: true })
  imageUrl: string[];

  @ApiProperty({
    type: 'string',
    example:
      'https://images.unsplash.com/photo-1506126279646-a697353d3166?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2UlMjBleHRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D',
    description: 'video url of the property',
  })
  @IsOptional()
  @IsUrl()
  videoUrl?: string;

  @ApiProperty({
    type: 'string',
    example: 'b7bcef79-c204-447d-9336-e277b114a5e2',
    description: 'ID of the selected building type',
  })
  @IsOptional()
  @IsUUID()
  buildingTypeId?: string;

  @ApiProperty({
    type: 'number',
    example: '1460',
    description: 'Size in square meters of the property',
  })
  @IsOptional()
  @IsNumber()
  size?: number;

  @ApiProperty({
    type: 'string',
    example: 'b7bcef79-c204-447d-9336-e277b114a5e2',
    description: 'ID of the selected condition of property',
  })
  @IsOptional()
  @IsUUID()
  buildingConditionId?: string;

  @ApiProperty({
    type: 'string',
    example: 'b7bcef79-c204-447d-9336-e277b114a5e2',
    description: 'ID of the selected furnish of property',
  })
  @IsOptional()
  @IsUUID()
  buildingFurnishId?: string;

  @ApiProperty({
    type: 'string',
    example: 'b7bcef79-c204-447d-9336-e277b114a5e2',
    description: 'ID of the selected apartment type of property',
  })
  @IsOptional()
  @IsUUID()
  apartmentTypeId?: string;

  @ApiProperty({
    type: 'number',
    example: 10,
    description: 'number of toilets',
  })
  @IsOptional()
  @IsNumber()
  toilet?: number;

  @ApiProperty({
    type: 'string',
    example: 'MONTHLY',
    description: 'rent type of the property',
  })
  @IsOptional()
  @IsEnum(RentType)
  rentType?: RentType;

  @ApiProperty({
    type: 'number',
    example: 1000000,
    description: 'rent fee of the property',
  })
  @IsOptional()
  @IsNumber()
  rentFee?: number;

  @ApiProperty({
    type: 'number',
    example: 100000,
    description: 'damage fee of the property',
  })
  @IsOptional()
  @IsNumber()
  damangeFee?: number;

  @ApiProperty({
    type: 'number',
    example: 1000,
    description: 'agency fee of the property',
  })
  @IsOptional()
  @IsNumber()
  agencyFee?: number;

  @ApiProperty({
    type: 'number',
    example: 500000,
    description: 'service charge fee of the property',
  })
  @IsOptional()
  @IsNumber()
  serviceCharge?: number;

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'rent duration of the property',
  })
  @IsOptional()
  @IsNumber()
  rentDuration?: number;

  @ApiProperty({
    type: 'array',
    example: '["b7bcef79-c204-447d-9336-e277b114a5e2"]',
    description: 'facilities in the property',
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  facilities?: string[];

  @ApiProperty({
    type: 'array',
    example: 'Luxirious 2 bedroom flat with 24/7 electricity',
    description: 'property description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: 'object',
    example: { smoking: true, pets: true },
    description: 'property metadata',
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
