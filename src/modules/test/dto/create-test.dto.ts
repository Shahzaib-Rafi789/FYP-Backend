import { IsNotEmpty, IsString, IsBoolean, IsArray, ValidateNested, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateModuleDto } from '../../module/dto/create-module.dto';

export class CreateTestDto {
  @IsNotEmpty()
  @IsString()
  alias: string;

  @IsBoolean()
  isPublic: boolean;

  @IsNotEmpty()
  @IsString()
  test_owner: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateModuleDto)
  modules: CreateModuleDto[]; // Array of module details
}
