import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUser, FileUsersSchema } from './users.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FileUser.name, schema: FileUsersSchema },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UserModule {}
