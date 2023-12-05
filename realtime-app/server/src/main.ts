import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import { SocketIoAdapter } from './socket.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all routes
  app.enableCors();

  // Use the WebSocket adapter
  app.useWebSocketAdapter(new WsAdapter(app));

  // Use the custom Socket.IO adapter with CORS configuration
  app.useWebSocketAdapter(new SocketIoAdapter(app));

  await app.listen(3001);
}

bootstrap();
