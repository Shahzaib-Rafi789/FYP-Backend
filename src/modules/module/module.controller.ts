import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { ModuleResponseDto } from './dto/module-response.dto';
import { ModuleService } from './module.service';

@Controller('modules')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post()
  async createModule(
    @Body() createModuleDto: CreateModuleDto,
  ): Promise<ModuleResponseDto> {
    return this.moduleService.createModule(createModuleDto);
  }

  @Get(':id')
  async getModuleById(@Param('id') id: string): Promise<ModuleResponseDto> {
    return this.moduleService.getModuleById(id);
  }

  @Get()
  async getAllModules(): Promise<ModuleResponseDto[]> {
    return this.moduleService.getAllModules();
  }

  @Delete('all')
  async deleteAllModules(): Promise<void> {
    return this.moduleService.deleteAllModules();
  }
}
