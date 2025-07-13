import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async create(createBlogDto: CreateBlogDto) {
    try {
      const blog = await this.prisma.blog.create({ data: createBlogDto });
      return blog;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const blogs = await this.prisma.blog.findMany();
      return { blogs };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const blog = await this.prisma.blog.findUnique({
        where: { id },
        include: { Comment: { omit: { blogId: true } } },
      });
      if (!blog) throw new NotFoundException('Blog not found!');

      return blog;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    try {
      const blog = await this.prisma.blog.findUnique({ where: { id } });
      if (!blog) throw new NotFoundException('Blog not found!');

      const updated_blog = await this.prisma.blog.update({
        where: { id },
        data: updateBlogDto,
      });

      return updated_blog;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const blog = await this.prisma.blog.findUnique({ where: { id } });
      if (!blog) throw new NotFoundException('Blog not found!');

      await this.prisma.blog.delete({ where: { id } });
      return { message: 'Blog is successfully deleted!' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
