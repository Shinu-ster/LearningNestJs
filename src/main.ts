import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); //38.
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
/*
  If here is an unhandled error in nest then it will automatically send 500 status code in response
*/
/*
Pipes can be used to validate or transform the input data from
the client before it even reaches to root handler
*/

/*
Gaurd is a class with injectable decorate and implements CanActivate method
CanActivate method return True to authorized acces
and False to deny request
nest g gu api-key -> creating gaurd 26. 
Runs before the controller method
used in auths and role based access

*/

// What runs first
/*
Middleware
Gaurds
Interceptors
Pipes
Controller
INterceptors
Exception Filters
*/

// 39. Going one step further with roles and their permissions
// admin -> can view create and delete anyones note
// teacher -> can only create and update their note
// student -> can only view notes
