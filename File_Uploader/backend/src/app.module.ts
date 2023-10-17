import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './clodinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FileModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    AuthModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
