import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto, userid) {
    const { title, description, body } = createArticleDto;
    if (!title || !body || !description) {
      return 'Title and Body Fields are Required';
    }
    return this.prisma.article.create({
      data: {
        ...createArticleDto,
        authorId: userid,
      },
    });
  }

  async findAll() {
    return await this.prisma.article.findMany({ where: { published: true } });
  }

  findDrafts() {
    return this.prisma.article.findMany({ where: { published: false } });
  }

  async findOne(id: number) {
    return await this.prisma.article.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  async findUser(id: number) {
    const articleData = await this.prisma.article.findUnique({
      where: { id },
    });

    id = articleData.authorId;
    const authorsData = await this.prisma.user.findUnique({
      where: { id },
    });
    return authorsData;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto, userid) {
    let article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) return `No Article Available by Id : ${id}`;
    if (article.id != userid)
      return `Unauthorized, Article is of Diffferent User`;

    return await this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  async remove(id: number, userid) {
    let article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) return `No Article Available by Id : ${id}`;
    if (article.id != userid)
      return `Unauthorized, Article is of Diffferent User`;
    return this.prisma.article.delete({ where: { id } });
  }
}
