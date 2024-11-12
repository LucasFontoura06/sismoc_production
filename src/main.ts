import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
    
    app.enableCors({
      origin: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
    });
    
    const port = process.env.PORT || 9001;
    
    console.log('Verificando variáveis de ambiente do Firebase...');
    console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID ? 'Configurado' : 'Não configurado');
    console.log('FIREBASE_PRIVATE_KEY:', process.env.FIREBASE_PRIVATE_KEY ? 'Configurado' : 'Não configurado');
    console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL ? 'Configurado' : 'Não configurado');
    
    await app.listen(port);
    console.log(`Aplicação rodando na porta: ${port}`);
  } catch (error) {
    console.error('Erro fatal ao inicializar a aplicação:', error);
    process.exit(1);
  }
}
bootstrap();