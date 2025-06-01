import { Injectable, HttpException, HttpStatus, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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

  async create(userId: string, req: Request) {
    try {
      console.log("Request:" ,req.body)

      const existingAttempt = await this.attemptModel.findOne({
        userId,
        status: 'in_progress'
      }).lean().exec();

      if (existingAttempt) {
        return {
          status: true,
          statusCode: HttpStatus.OK,
          path: req.url,
          message: 'Test already in progress. Resuming the test.',
          result: existingAttempt
        };
      }

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
        userId: userId, 
        modules: test.modules.map(module => ({
          moduleName: module.module_type,
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
      console.log(error)
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

  async getAttemptDetails(attemptId: string, userId: string, req: Request) {
    try {
      // 1. Find the attempt
      const attempt = await this.attemptModel.findOne({
        _id: attemptId,
        // userId: userId
      }).lean().exec();

      if (!attempt) {
        throw new NotFoundException({
          status: false,
          statusCode: 404,
          path: req.url,
          message: 'Test attempt not found',
          result: {}
        });
      }

      // 2. Get detailed test using existing service
      const detailedTest = await this.testService.getTestById(attempt.testId.toString());

      if (!detailedTest) {
        throw new NotFoundException({
          status: false,
          statusCode: 404,
          path: req.url,
          message: 'Associated test not found',
          result: {}
        });
      }

      // 3. Combine the data
      const result = {
        ...attempt,
        test: detailedTest
      };

      return {
        status: true,
        statusCode: 200,
        path: req.url,
        message: 'Test attempt fetched successfully',
        result: result
      };

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      
      throw new InternalServerErrorException({
        status: false,
        statusCode: 500,
        path: req.url,
        message: 'Internal server error',
        result: {}
      });
    }
  }

  async getPaginatedAttempts(
    page: number,
    limit: number,
    userId: string,
    path: string
  ) {
    // 1. Query attempts with sorting
    const attempts = await this.attemptModel
      .find({ userId })
      .sort({ startedAt: 1 }) // 1 = ascending (oldest first)
      .exec();

    // 2. Handle empty results
    if (attempts.length === 0) {
      return {
        status: false,
        statusCode: 200,
        path,
        message: 'No test attempts found for the user',
        result: {
          total: 0,
          hasMore: false,
          page: 0,
          limit: 0,
          attempts: []
        }
      };
    }

    // 3. Pagination logic
    const startIndex = (page - 1) * limit;
    const paginatedAttempts = attempts.slice(startIndex, startIndex + limit);
    const hasMore = attempts.length > startIndex + limit;

    // 4. Return formatted response
    return {
      status: true,
      statusCode: 200,
      path,
      message: 'Test attempts fetched successfully',
      result: {
        total: attempts.length,
        hasMore,
        page,
        limit,
        attempts: paginatedAttempts
      }
    };
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
