import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => {
    req.header('Access-Control-Allow-Origin', 'http://127.0.0.1:4200');
    req.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    req.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    req.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:4200');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
  app.enableCors({
    allowedHeaders: '*',
    origin: process.env.FRONT_PATH,
    credentials: true,
    methods: ['POST', 'PUT', 'DELETE', 'GET']
  })
  app.use(cookieParser());
  await app.listen(process.env.APP_PORT);
}
bootstrap();
