import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstateDto } from './dto/create-estate.dto';
import { UpdateEstateDto } from './dto/update-estate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estate } from './entities/estate.entity';
import { ILike, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class EstatesService {
  constructor(
    @InjectRepository(Estate)
    private readonly estateRepository: Repository<Estate>
  ) {}

  async create(createEstateDto: CreateEstateDto) {
    //const estate = this.estateRepository.create(createEstateDto);
    const estate = new Estate({
      ...createEstateDto,
      comments: [],
    });
    return await this.estateRepository.save(estate);
  }

  async findAll(searchQuery: string) {
    if (!searchQuery) {
      return this.estateRepository.find();
    }
    return this.estateRepository.find({
      where: {
        name: ILike(`%${searchQuery}%`),
      },
    });
  }

  async findOne(id: number) {
    const estate = await this.estateRepository.findOne({
      where: {
        id: id,
      },
      relations: { comments: true },
    });
    if (!estate) {
      throw new NotFoundException();
    }
    return estate;
  }

  async update(id: number, updateEstateDto: UpdateEstateDto) {
    const estate = await this.findOne(id);
    if (!estate) {
      throw new NotFoundException();
    }

    Object.assign(estate, updateEstateDto);

    if (updateEstateDto.comments) {
      const comments = updateEstateDto.comments.map((createCommentDto) => new Comment(createCommentDto));
      estate.comments = comments;
    }

    return await this.estateRepository.save(estate);
  }

  async remove(id: number) {
    const estate = await this.findOne(id);
    if (!estate) {
      throw new NotFoundException();
    }

    return await this.estateRepository.remove(estate);
  }
}
