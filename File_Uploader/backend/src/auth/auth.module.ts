import { Module } from '@nestjs/common';
import { UserModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUser, FileUsersSchema } from 'src/users/users.model';
// import { LocalStrategy } from './local.auth';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'TOP',
      signOptions: { expiresIn: '12h' },
    }),
    MongooseModule.forFeature([
      { name: FileUser.name, schema: FileUsersSchema },
    ]),
  ],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
