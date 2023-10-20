import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as brcypt from 'bcrypt';

export const hashingSalt = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    let isEmailExist = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (isEmailExist) return 'User already exist, Please Login';
    const hashedPassword = await brcypt.hash(
      createUserDto.password,
      hashingSalt,
    );
    createUserDto.password = hashedPassword;
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  getUserPost(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        articles: true,
        profile: true,
      },
    });
  }

  async update(updateUserDto: UpdateUserDto, userid) {
    const hashedPassword = await brcypt.hash(
      updateUserDto.password,
      hashingSalt,
    );
    updateUserDto.password = hashedPassword;
    return this.prisma.user.update({
      where: { id: userid },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
