import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @ApiProperty({ example: 'title for blog' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'description for blog' })
  @IsString()
  @IsOptional()
  description?: string;
}
