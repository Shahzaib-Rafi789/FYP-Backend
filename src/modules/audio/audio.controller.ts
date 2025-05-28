import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { AudioService } from './audio.service';
import { CreateAudioDto } from './dto/create-audio.dto';
import { UpdateAudioDto } from './dto/update-audio.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { audioStorage } from 'src/common/cloudinary/cloudinary.audio-storage';
import { Express } from 'express';
import cloudinary from 'src/config/cloudinary.config';
import { cloudinaryConfig } from 'src/config/cloudinary.config';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: audioStorage }))
  async uploadAudio(@UploadedFile() file: Express.Multer.File) {
    return this.audioService.handleUpload(file);
  }

  @Get('cloudinary-test')
async testCloudinary() {
  try {
    console.log("baka:", cloudinaryConfig, process.env.CLOUDINARY_API_KEY)
    const result = await cloudinary.uploader.upload(
      'https://res.cloudinary.com/demo/video/upload/waves.mp3',
      {
        resource_type: 'video', // Needed for audio files
      },
    );
    return {
      message: 'Cloudinary is working!',
      data: result,
    };
  } catch (err) {
    console.error('Cloudinary error:', err); // Log detailed error
    return {
      message: 'Cloudinary test failed',
      error: err.message, // Include error message in response
    };
  }
}


  @Get()
  findAll() {
    return this.audioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAudioDto: UpdateAudioDto) {
    return this.audioService.update(+id, updateAudioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.audioService.remove(+id);
  }
}
