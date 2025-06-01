import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartService } from './part.service';
import { PartController } from './part.controller';
import { QuestionGroupModule } from '../question-group/question-group.module';
import { Part, PartSchema } from './part.model';
import { PartEvaluator } from './part.evaluator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Part.name, schema: PartSchema }]),
    QuestionGroupModule,
  ],
  providers: [PartService, PartEvaluator],
  controllers: [PartController],
  exports: [PartService],
})
export class PartModule {}
