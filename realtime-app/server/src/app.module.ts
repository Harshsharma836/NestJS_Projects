// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DB_HOST || 'localhost',
    //   port: +process.env.DB_PORT || 3306,
    //   username: process.env.DB_USERNAME || 'root',
    //   password: process.env.DB_PASSWORD || 'password',
    //   database: process.env.DB_DATABASE || 'nestjs_chat',
    //   entities: ["dist/**/*.entity.js"],
    //   synchro'nize: true,
    // }),
    AuthModule,
    ChatModule,
  ],
  
})
export class AppModule {}
