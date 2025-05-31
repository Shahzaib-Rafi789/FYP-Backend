import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test } from './test.model';
import { CreateTestDto } from './dto/create-test.dto';
import { AddTestDto } from './dto/add-test.dto';
import { TestResponseDto } from './dto/test-response.dto';
import { ModuleService } from '../module/module.service';
import { LoggerService } from '../../common/utils/logger/logger.service';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(Test.name) private testModel: Model<Test>,
    private readonly moduleService: ModuleService, // Service to handle modules
    private readonly logger: LoggerService,
  ) {}

  async createTest(createTestDto: CreateTestDto): Promise<TestResponseDto> {
    const modules = [];

    // Create each module and collect its ID
    for (const moduleDto of createTestDto.modules) {
      const createdModule = await this.moduleService.createModule(moduleDto);
      modules.push(createdModule.moduleId); // Collect the ID of the created module
    }

    // Prepare the test for saving
    const addTestDto: AddTestDto = {
      alias: createTestDto.alias,
      isPublic: createTestDto.isPublic,
      test_owner: createTestDto.test_owner,
      modules,
    };

    const createdTest = new this.testModel(addTestDto);
    const savedTest = await createdTest.save();

    this.logger.log('New Test Created Successfully!!', 'TestService');

    return new TestResponseDto(savedTest);
  }

  async getTestById(testId: string): Promise<TestResponseDto> {
    const test = await this.testModel.findById(testId).populate({
      path: 'modules',
      populate: {
        path: 'parts',
        populate: {
          path: 'question_groups',
          populate: { path: 'questions' },
        },
      },
    });

    if (!test) {
      throw new Error(`Test with ID ${testId} not found.`);
    }

    return new TestResponseDto(test);
    // return new TestResponseDto({
    //   testId: test._id.toString(),
    //   alias: test.alias,
    //   isPublic: test.isPublic,
    //   test_owner: test.test_owner,
    //   modules: test.modules,
    // });
  }

  async deleteAllTests(): Promise<void> {
    await this.testModel.deleteMany();
  }

  async getAllTests(): Promise<TestResponseDto[]> {
    const tests = await this.testModel.find().populate({
      path: 'modules',
      populate: {
        path: 'parts',
        populate: {
          path: 'question_groups',
          populate: { path: 'questions' },
        },
      },
    });

    return tests.map((test) => new TestResponseDto(test));
  }

  async getRandomTest() {
      const tests = await this.testModel.find({}, { _id: 1 }); // only fetch _id
    if (tests.length === 0) {
      throw new NotFoundException('No tests found.');
    }

    const randomIndex = Math.floor(Math.random() * tests.length);
    // return tests[randomIndex]
    const testId = tests[randomIndex]._id.toString();
    // return testId;
    return this.getTestById(testId);
  }
  
}
