import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 4000;

  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const config = new DocumentBuilder()
  .setTitle('Notapp')
  .setDescription(
    'notApp is a simple and efficient tool designed to help you organize your thoughts and ideas quickly and effectively. With an intuitive interface, you can easily create, edit, and delete notes, allowing you to capture and manage important information instantly. \n\n ▪️ Manuela Giraldo Arango',
  )
  .setVersion('1.0')
  .addTag('Notes')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/doc', app, document);

  await app.listen(port);
  console.log(`Server running on port ${port}`);
  console.log(`Access to the project via Swagger: localhost:${port}/api-doc`);
}
bootstrap();
