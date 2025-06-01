// src/common/ai/speech-evaluation.module.ts
import { Module } from '@nestjs/common';
import { AiSpeechEvaluationService } from './services/speech-evaluation.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [AiSpeechEvaluationService],
  exports: [AiSpeechEvaluationService] // This is crucial
})
export class SpeechEvaluationModule {}