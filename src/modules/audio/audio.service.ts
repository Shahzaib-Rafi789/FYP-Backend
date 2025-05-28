import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Audio, AudioDocument } from './audio.model';
import { CreateAudioDto } from './dto/create-audio.dto';
import { UpdateAudioDto } from './dto/update-audio.dto';

@Injectable()
export class AudioService {
  constructor(
    @InjectModel(Audio.name) private readonly audioModel: Model<AudioDocument>,
  ) {}

  async handleUpload(file: Express.Multer.File) {
    // File metadata is available here after Cloudinary upload
    const newAudio = new this.audioModel({
      url: file.path,
      format: file.mimetype,
      size: file.size,
    });

    return await newAudio.save();
  }

  findAll() {
    return `This action returns all audio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} audio`;
  }

  update(id: number, updateAudioDto: UpdateAudioDto) {
    return `This action updates a #${id} audio`;
  }

  remove(id: number) {
    return `This action removes a #${id} audio`;
  }
}
