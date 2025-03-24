import {
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePartDto } from '../../part/dto/create-part.dto';

export class CreateModuleDto {
  @IsNotEmpty()
  @IsString()
  module_type: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreatePartDto)
  parts: CreatePartDto[]; // Array of part details
}
