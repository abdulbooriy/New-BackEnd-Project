import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    try {
      const findBlog = await this.prisma.blog.findUnique({
        where: { id: createCommentDto.blogId },
      });
      if (!findBlog) throw new NotFoundException('Blog not found!');

      const new_comment = await this.prisma.comment.create({
        data: createCommentDto,
      });

      return new_comment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const comments = await this.prisma.comment.findMany();
      return { comments };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const find_comment = await this.prisma.comment.findUnique({
        where: { id },
        include: { blog: true },
        omit: { blogId: true },
      });
      if (!find_comment) throw new NotFoundException('Comment not found!');

      return find_comment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      const find_comment = await this.prisma.comment.findUnique({
        where: { id },
      });
      if (!find_comment) throw new NotFoundException('Comment not found!');

      const findBlog = await this.prisma.blog.findUnique({
        where: { id: updateCommentDto.blogId },
      });
      if (!findBlog) throw new NotFoundException('Blog not found!');

      const updated_comment = await this.prisma.comment.update({
        where: { id },
        data: updateCommentDto,
      });

      return updated_comment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const find_comment = await this.prisma.comment.findUnique({
        where: { id },
      });
      if (!find_comment) throw new NotFoundException('Comment not found!');

      await this.prisma.comment.delete({ where: { id } });
      return { message: 'Comment is successfully deleted!' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
