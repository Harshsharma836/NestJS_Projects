import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [FileModule , 
    MongooseModule.forRoot(
      'mongodb+srv://harsh:1234@netflix.ganq2b0.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
