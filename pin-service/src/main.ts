import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Habilita CORS y permite solicitudes desde el frontend
    app.enableCors({
        origin: ['http://localhost:3000', 'http://localhost:8000'],
        credentials: true,
    });

    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`Server is running on http://localhost:${port}`);
}
bootstrap();
