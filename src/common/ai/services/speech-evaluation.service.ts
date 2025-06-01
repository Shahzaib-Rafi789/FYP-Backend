// src/common/ai/services/evaluation.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AiEvaluationResult } from 'src/common/interfaces/ai.evaluation.interfsce';

@Injectable()
export class AiSpeechEvaluationService {
  private readonly API_URL: string;

  constructor(
    private readonly httpService: HttpService,
  ) {
    // this.API_URL = this.configService.get('AI_API_URL');
    this.API_URL = "http://127.0.0.1:8000"
  }

  async evaluateSpeech(audioUrl: string): Promise<AiEvaluationResult> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(`${this.API_URL}/evaluate-speech`, {
          audio_url: audioUrl
        }, {
        //   timeout: 30000
        })
      );
      
      return this.formatResponse(data);
    } catch (error) {
      throw new Error(`AI evaluation failed: ${error.response?.data?.message || error.message}`);
    }
  }

  private formatResponse(rawData: any): AiEvaluationResult {
    return {
      Score: rawData['Scores (1-9)']['Overall Score'],
      Feedback: rawData.Feedback,
      Detailed: rawData
    };
  }
}