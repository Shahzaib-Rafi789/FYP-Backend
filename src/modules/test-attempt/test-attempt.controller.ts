import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TestAttemptService } from './test-attempt.service';
import { CreateTestAttemptDto } from './dto/create-test-attempt.dto';
import { UpdateTestAttemptDto } from './dto/update-test-attempt.dto';
import { Request } from 'express';

@Controller('test-attempts')
export class TestAttemptController {
  constructor(private readonly testAttemptService: TestAttemptService) {}

  @Post()
  async create(@Req() req: Request) {
    const result = await this.testAttemptService.create(req);
    return result;
  }

  @Get()
  findAll() {
    return this.testAttemptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testAttemptService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestAttemptDto: UpdateTestAttemptDto) {
    return this.testAttemptService.update(+id, updateTestAttemptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testAttemptService.remove(+id);
  }
}
