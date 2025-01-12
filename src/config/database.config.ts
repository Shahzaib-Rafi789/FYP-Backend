import { MongooseModule } from '@nestjs/mongoose';

export const DatabaseConfig = MongooseModule.forRootAsync({
  useFactory: () => ({
    uri: process.env.MONGODB_URI || 'mongodb+srv://BandUp:iY3DaAQ504lErCbo@cluster0.fmlnz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  }),
});
