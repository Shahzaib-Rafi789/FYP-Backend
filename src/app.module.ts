import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { QuestionModule } from './modules/question/question.module';
import { QuestionGroupModule } from './modules/question-group/question-group.module';
import { PartModule } from './modules/part/part.module';
import { ModuleModule } from './modules/module/module.module';
import { TestModule } from './modules/test/test.module';

@Module({
  imports: [DatabaseModule, UserModule, QuestionModule, QuestionGroupModule, PartModule, ModuleModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
