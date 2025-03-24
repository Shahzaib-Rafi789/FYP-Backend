import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const GLOBAL_PREFIX = 'api/v1';
  const FRONTEND_URL = process.env.FRONTEND_URL;
  const PORT = process.env.PORT ?? 5000;
  const NODE_ENV = process.env.NODE_ENV;
  const corsOptions: CorsOptions = { origin: [FRONTEND_URL] };

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.enableCors(corsOptions);
  await app.listen(PORT);

  console.log('🚀 Application started!');
  console.log(
    `🔹 Backend: http://localhost:${PORT}/${GLOBAL_PREFIX} ${process.env.PORT === undefined ? '(undefined)' : '(From env)'}`,
  );
  console.log(
    `🔹 Frontend: ${FRONTEND_URL} ${process.env.FRONTEND_URL === undefined ? '(undefined)' : '(From env)'}`,
  );
  console.log(
    `🌍 Environment: ${NODE_ENV} ${process.env.NODE_ENV === undefined ? '(undefined)' : '(From env)'}`,
  );
}

bootstrap();
