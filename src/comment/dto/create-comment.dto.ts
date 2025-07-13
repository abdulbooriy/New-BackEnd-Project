import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'blog_uuid' })
  @IsString()
  @IsNotEmpty()
  blogId: string;

  @ApiProperty({ example: 'message for comment' })
  @IsString()
  @IsNotEmpty()
  message: string;
}
