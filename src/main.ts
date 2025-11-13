import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

/*
 1.
 nest generate controller episodes -> creating controller, 
 Controllers: handles HTTP requests and responses

 nest generate service episodes -> creating services
 Services: Contains the business logic or data logic

  nest g s config -> shortcut g for generate s for service
*/
