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
import { LoggerModule } from './common/utils/logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { AudioModule } from './modules/audio/audio.module';
import { envSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envSchema,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    DatabaseModule,
    LoggerModule,
    UserModule,
    QuestionModule,
    QuestionGroupModule,
    PartModule,
    ModuleModule,
    TestModule,
    AudioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
