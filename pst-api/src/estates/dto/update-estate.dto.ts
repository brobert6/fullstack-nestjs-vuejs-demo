import { PartialType } from '@nestjs/mapped-types';
import { CreateEstateDto } from './create-estate.dto';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateEstateDto extends PartialType(CreateEstateDto) {
  comments: CreateCommentDto[];
}
