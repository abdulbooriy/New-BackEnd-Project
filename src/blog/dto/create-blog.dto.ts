import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({ example: 'title for blog' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'description for blog' })
  @IsString()
  @IsOptional()
  description: string;
}
