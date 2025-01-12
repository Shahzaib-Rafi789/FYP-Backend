import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { AddTestDto } from './dto/add-test.dto';
import { TestResponseDto } from './dto/test-response.dto';

@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  async createTest(@Body() createTestDto: CreateTestDto): Promise<TestResponseDto> {
    return this.testService.createTest(createTestDto);
  }

  @Get(':id')
  async getTestById(@Param('id') id: string): Promise<TestResponseDto> {
    return this.testService.getTestById(id);
  }

  @Get()
  async getAllTests(): Promise<TestResponseDto[]> {
    return this.testService.getAllTests();
  }

  @Delete('all')
  async deleteAllTests(): Promise<void> {
    return this.testService.deleteAllTests();
  }
}
