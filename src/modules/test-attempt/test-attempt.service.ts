import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestAttempt } from './entities/test-attempt.entity';
import { TestService } from '../test/test.service';
import { Request } from 'express';
import { UpdateTestAttemptDto } from './dto/update-test-attempt.dto';

@Injectable()
export class TestAttemptService {
  constructor(
    @InjectModel(TestAttempt.name) private attemptModel: Model<TestAttempt>,
    private readonly testService: TestService
  ) {}

  async create(req: Request) {
    try {
      const test = await this.testService.getRandomTest();
      
      if (!test) {
        throw new HttpException(
          {
            status: false,
            statusCode: HttpStatus.NOT_FOUND,
            path: req.url,
            message: 'Test not found.',
            result: {},
          },
          HttpStatus.NOT_FOUND
        );
      }

      const newAttempt = new this.attemptModel({
        testId: test.testId,
        userId: "", 
        modules: test.modules.map(module => ({
          moduleName: module.name,
          status: 'pending',
          startedAt: null,
          completedAt: null
        })),
        status: 'in_progress',
        startedAt: new Date()
      });

      const savedAttempt = await newAttempt.save();

      return {
        status: true,
        statusCode: HttpStatus.CREATED,
        path: req.url,
        message: 'Test attempt started successfully.',
        result: savedAttempt,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          path: req.url,
          message: 'Failed to create test attempt',
          result: {},
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  findAll() {
    return `This action returns all testAttempt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testAttempt`;
  }

  update(id: number, updateTestAttemptDto: UpdateTestAttemptDto) {
    return `This action updates a #${id} testAttempt`;
  }

  remove(id: number) {
    return `This action removes a #${id} testAttempt`;
  }
}
