import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestModule } from './module.model';
import { CreateModuleDto } from './dto/create-module.dto';
import { AddModuleDto } from './dto/add-module.dto';
import { ModuleResponseDto } from './dto/module-response.dto';
import { PartService } from '../part/part.service';

@Injectable()
export class ModuleService {
  constructor(
    @InjectModel(TestModule.name) private moduleModel: Model<TestModule>,
    private readonly partService: PartService, // Service to handle parts
  ) {}

  async createModule(
    createModuleDto: CreateModuleDto,
  ): Promise<ModuleResponseDto> {
    const parts = [];

    // Create each part and collect its ID
    for (const partDto of createModuleDto.parts) {
      const createdPart = await this.partService.createPart(partDto);
      parts.push(createdPart.partId); // Collect the ID of the created part
    }

    // Prepare the module for saving
    const addModuleDto: AddModuleDto = {
      module_type: createModuleDto.module_type,
      parts,
    };

    const createdModule = new this.moduleModel(addModuleDto);
    const savedModule = await createdModule.save();

    return new ModuleResponseDto(savedModule);
  }

  async getModuleById(moduleId: string): Promise<ModuleResponseDto> {
    const module = await this.moduleModel.findById(moduleId).populate({
      path: 'parts',
      populate: {
        path: 'question_groups',
        populate: { path: 'questions' },
      },
    });

    if (!module) {
      throw new Error(`Module with ID ${moduleId} not found.`);
    }

    return new ModuleResponseDto({
      moduleId: module._id.toString(),
      module_type: module.module_type,
      parts: module.parts,
    });
  }

  async getAllModules(): Promise<ModuleResponseDto[]> {
    const modules = await this.moduleModel.find().populate({
      path: 'parts',
      populate: {
        path: 'question_groups',
        populate: { path: 'questions' },
      },
    });

    return modules.map((module) => new ModuleResponseDto(module));
  }

  async deleteAllModules(): Promise<void> {
    await this.moduleModel.deleteMany();
  }
}
