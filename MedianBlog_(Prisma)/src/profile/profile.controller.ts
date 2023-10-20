import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createProfileDto: CreateProfileDto, @Req() req) {
    return this.profileService.create(createProfileDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  profileDetails(@Req() req) {
    return this.profileService.profileDetails(req.user.id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@Body() updateProfileDto: UpdateProfileDto, @Req() req) {
    return this.profileService.update(updateProfileDto, req.user.id);
  }
}
