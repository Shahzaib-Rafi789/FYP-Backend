import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const GLOBAL_PREFIX = 'api/v1';
  const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:3000';
  const PORT = process.env.PORT ?? 5000;
  const NODE_ENV = process.env.NODE_ENV ?? 'development';
  const corsOptions: CorsOptions = { origin: [FRONTEND_URL] };

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.enableCors(corsOptions);
  await app.listen(PORT);

  console.log('🚀 Application started!');
  console.log(
    `🔹 Backend: http://localhost:${PORT}/${GLOBAL_PREFIX} ${process.env.PORT === undefined ? '(default: 5000)' : '(From env)'}`,
  );
  console.log(
    `🔹 Frontend: ${FRONTEND_URL} ${process.env.FRONTEND_URL === undefined ? '(default: http://localhost:3000)' : '(From env)'}`,
  );
  console.log(
    `🌍 Environment: ${NODE_ENV} ${process.env.NODE_ENV === undefined ? '(default: development)' : '(env)'}`,
  );
}

bootstrap();
