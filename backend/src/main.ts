import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExecptionFilter } from './utils/filters/global.exception.filter';
import { json, urlencoded } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ limit: '100mb', extended: true }));
  app.useGlobalFilters(new GlobalExecptionFilter());

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription(
      `API documentation for the application developed at Hudla's challenge, which is a user transaction management application. This application has JWT token-based authentication and authorization, so always update your credentials to make your requests.`,
    )
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Enter your jwt token',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
