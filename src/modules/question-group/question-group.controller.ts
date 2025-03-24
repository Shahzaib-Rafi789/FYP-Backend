import { Body, Controller, Get, Delete, Param, Post } from '@nestjs/common';
import { QuestionGroupService } from './question-group.service';
import { CreateQuestionGroupDto } from './dto/create-question-group.dto';

@Controller('question-groups')
export class QuestionGroupController {
  constructor(private readonly questionGroupService: QuestionGroupService) {}

  @Post()
  async createQuestionGroup(
    @Body() createQuestionGroupDto: CreateQuestionGroupDto,
  ) {
    return this.questionGroupService.createQuestionGroup(
      createQuestionGroupDto,
    );
  }

  @Get(':id')
  async getQuestionGroup(@Param('id') id: string) {
    return this.questionGroupService.getQuestionGroupById(id);
  }

  @Get()
  async getAllQuestionGroups() {
    return this.questionGroupService.getAllQuestionGroups();
  }

  @Delete('all')
  async deleteAllQuestionGroups(): Promise<{ deletedCount: number }> {
    return this.questionGroupService.deleteAllQuestionGroups();
  }
}
