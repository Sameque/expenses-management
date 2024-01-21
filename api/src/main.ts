import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API Title')
    .setDescription('API Expense')
    .setVersion('1.0')
    .addTag('Api Expense')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  const options2 = {
    // customCss: '.swagger-ui .topbar { display: none }'
    customCss: `
      .topbar-wrapper img {content:url(\'../assets/img/lbglogo.png\'); width:300px; height:auto;}
      .swagger-ui .topbar { background-color: white; }
      `,
  };
  SwaggerModule.setup('api-docs', app, document, options2);
  await app.listen(3000);
}
bootstrap();
