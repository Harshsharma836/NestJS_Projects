import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './Schema/file.schema';
import { EmailService } from 'src/email/email.service';
import { CloudinaryModule } from 'src/clodinary/cloudinary.module';
import { FileUser, FileUsersSchema } from 'src/users/users.model';

@Module({
  imports: [
    CloudinaryModule,
    MongooseModule.forFeature([
      { name: File.name, schema: FileSchema },
      { name: FileUser.name, schema: FileUsersSchema },
    ]),

    // This Is Used To Store File In Local Folder , But we are now Using Coudinary
    // MulterModule.register({
    //   dest: './uploads', // Define the upload directory
    // }),
  ],
  controllers: [FileController],
  providers: [FileService, EmailService],
})
export class FileModule {}
