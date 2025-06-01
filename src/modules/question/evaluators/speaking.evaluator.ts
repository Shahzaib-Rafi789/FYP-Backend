// src/questions/evaluators/speaking.evaluator.ts
import { Injectable } from '@nestjs/common';
import { AiSpeechEvaluationService } from 'src/common/ai/services/speech-evaluation.service';
import { AudioService } from '../../audio/audio.service';
// import { Question } from '../question.model';
import { QuestionEvaluator } from 'src/common/interfaces/evaluator.interface';

@Injectable()
export class SpeakingEvaluator implements QuestionEvaluator  {
  constructor(
    private readonly aiService: AiSpeechEvaluationService,
    private readonly audioService: AudioService
  ) {}

  async evaluate(question: any, response: Express.Multer.File) {
    // 1. Upload and save audio file
    const audioRecord = await this.audioService.handleUpload(response);
    
    // 2. Get AI evaluation
    const { Score: bandScore, Feedback } = await this.aiService.evaluateSpeech(audioRecord.url);
    
    // 3. Calculate marks
    const marksObtained = (bandScore / 9) * question.max_marks;
    
    console.log({
        marksObtained,
        isCorrect: true,
        feedback: Feedback,
        audioUrl: audioRecord.url,
        bandScore
      })

    return {
      marksObtained,
      isCorrect: true, // Or set your own passing threshold
      feedback: Feedback,
    //   audioUrl: audioRecord.url,
    //   bandScore
    };
  }
}