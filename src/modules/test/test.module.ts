import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestSchema } from './test.model';
import { ModuleModule } from '../module/module.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Test.name, schema: TestSchema }]),
    ModuleModule,
  ],
  providers: [TestService],
  controllers: [TestController],
  exports: [TestService],
})
export class TestModule {}
