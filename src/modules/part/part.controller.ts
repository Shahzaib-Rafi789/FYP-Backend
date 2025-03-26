import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PartService } from './part.service';
import { CreatePartDto } from './dto/create-part.dto';
import { PartResponseDto } from './dto/part-response.dto';

@Controller('parts')
export class PartController {
  constructor(private readonly partService: PartService) {}

  @Post()
  async createPart(
    @Body() createPartDto: CreatePartDto,
  ): Promise<PartResponseDto> {
    return this.partService.createPart(createPartDto);
  }

  @Get(':id')
  async getPartById(@Param('id') id: string): Promise<PartResponseDto> {
    return this.partService.getPartById(id);
  }

  @Get()
  async getAllParts(): Promise<PartResponseDto[]> {
    return this.partService.getAllParts();
  }

  @Delete('all')
  async deleteAllParts(): Promise<{ deletedCount: number }> {
    return this.partService.deleteAllParts();
  }
}
