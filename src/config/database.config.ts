import { MongooseModule } from '@nestjs/mongoose';

export const DatabaseConfig = MongooseModule.forRootAsync({
  useFactory: () => ({
    uri: process.env.MONGODB_URI,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  }),
});
