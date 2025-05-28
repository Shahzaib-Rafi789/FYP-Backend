import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../../config/cloudinary.config';

export const audioStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const supportedFormats = {
      'audio/mpeg': 'mp3',
      'audio/wav': 'wav',
      'audio/x-wav': 'wav',
      'audio/x-m4a': 'm4a',
      'audio/mp4': 'm4a',
      'audio/x-aac': 'aac',
    };

    const format = supportedFormats[file.mimetype] || 'mp3'; // fallback

    return {
      folder: 'ielts-audio',
      resource_type: 'video', // needed for audio files
      format,
    };
  },
});
