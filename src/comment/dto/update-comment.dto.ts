import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({ example: 'blog_uuid' })
  @IsString()
  @IsOptional()
  blogId?: string;

  @ApiProperty({ example: 'message for comment' })
  @IsString()
  @IsOptional()
  message?: string;
}
