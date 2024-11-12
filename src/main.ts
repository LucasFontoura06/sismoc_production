import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    
    app.enableCors({
      origin: ['http://localhost:3000', 'sua-url-frontend.vercel.app'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      credentials: true,
    });
    
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`Application is running on PORT: ${port}`);
  } catch (error) {
    console.error('Erro ao inicializar a aplicação:', error);
    process.exit(1);
  }
}
bootstrap();
