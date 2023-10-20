import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private Prisma: PrismaService) {}

  async create(createProfileDto: CreateProfileDto, userid) {
    try {
      const res = await this.Prisma.profile.create({
        data: {
          ...createProfileDto,
          profileId: userid,
        },
      });
    } catch (err) {
      return 'Profile Already Added ';
    }
  }

  async profileDetails(userid) {
    return await this.Prisma.profile.findUnique({
      where: { profileId: userid },
    });
  }

  async update(updateProfileDto: UpdateProfileDto, userid) {
    return await this.Prisma.profile.update({
      where: { profileId: userid },
      data: updateProfileDto,
    });
  }
}
