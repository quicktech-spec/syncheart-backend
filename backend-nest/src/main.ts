import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // Setting global prefix to match v1 architecture spec
    app.setGlobalPrefix('api/v1');

    // CORS configuration for React Native/Web clients
    app.enableCors();

    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 SynchHeart V2 Enterprise API running on: http://localhost:${port}/api/v1`);
}
bootstrap();
