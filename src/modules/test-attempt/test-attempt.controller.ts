import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Query } from '@nestjs/common';
import { TestAttemptService } from './test-attempt.service';
import { CreateTestAttemptDto } from './dto/create-test-attempt.dto';
import { UpdateTestAttemptDto } from './dto/update-test-attempt.dto';
import { Request, Response } from 'express';

@Controller('test-attempts')
export class TestAttemptController {
  constructor(private readonly testAttemptService: TestAttemptService) {}

  @Post()
  async create(@Req() req: Request) {
    const result = await this.testAttemptService.create(req);
    return result;
  }

  @Get(':id')
  async getAttempt(
    @Param('id') attemptId: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      // const userId = req.user.id; // From your auth middleware
      const response = await this.testAttemptService.getAttemptDetails(attemptId, "userId", req);
      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res.status(error.getStatus()).json(error.getResponse());
    }
  }

  @Get()
  async getPaginatedAttempts(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const userId = (req as any).user.id; // Not recommended long-term
      const result = await this.testAttemptService.getPaginatedAttempts(
        parseInt(page),
        parseInt(limit),
        userId,
        req.url
      );
      
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: 'Internal server error'
      });
    }
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
