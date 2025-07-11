import { Module } from '@nestjs/common';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PartModule } from '../part/part.module';
import { TestModule, TestModuleSchema } from './module.model';
import { ModuleEvaluator } from './module.evaluator';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TestModule.name, schema: TestModuleSchema },
    ]),
    PartModule,
  ],
  providers: [ModuleService, ModuleEvaluator],
  controllers: [ModuleController],
  exports: [ModuleService],
})
export class ModuleModule {}
