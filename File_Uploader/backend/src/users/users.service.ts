import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileUser } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(FileUser.name) private userModel: Model<FileUser>) {}

  async createUser(username: string, password: string): Promise<FileUser> {
    const user = await this.userModel.create({
      username: username,
      password: password,
    });
    return user;
  }

  async getUser(query: object): Promise<FileUser> {
    return await this.userModel.findOne(query);
  }
}
