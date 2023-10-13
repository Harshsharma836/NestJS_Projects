import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from './user.schema';
import { ForgotPassword, ForgotPasswordSchema } from './forgot.password.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema} ,
    {name : ForgotPassword.name , schema : ForgotPasswordSchema}
    ]),
    JwtModule.register({
      global: true,
      secret: 'I_AM_SECRET',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
