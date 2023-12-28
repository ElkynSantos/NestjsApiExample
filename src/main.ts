import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './Common/Filters/http.exception.filters';
import { TimeoutInterceptor } from './Common/Interceptor/timeout.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor() )
  app.useGlobalPipes(new ValidationPipe())

  const options = new DocumentBuilder().setTitle('Superflight API').setDescription('Vuelos Programados').setVersion('1.0.0').addBearerAuth().build();

  const document = SwaggerModule.createDocument(app,options);

SwaggerModule.setup('/api/docs',app,document);
  await app.listen(process.env.PORT||3000);
}
bootstrap();
