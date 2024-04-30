import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly citiesRepository: Repository<City>
  ) {}

  async create(createCityDto: CreateCityDto) {
    const city = this.citiesRepository.create(createCityDto);
    return await this.citiesRepository.save(city);
  }

  async findAll() {
    return this.citiesRepository.find();
  }

  async paginate(options: IPaginationOptions, searchQuery?: string, sortBy?: string, sortOrder: 'ASC' | 'DESC' = 'ASC'): Promise<Pagination<City>> {
    const queryBuilder = this.citiesRepository.createQueryBuilder('c');

    if (searchQuery) {
      queryBuilder.where('c.name ILIKE :searchQuery OR c.description ILIKE :searchQuery', { searchQuery: `%${searchQuery}%` });
    }

    if (sortBy) {
      const orderDirection = sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      queryBuilder.orderBy(`c.${sortBy}`, orderDirection);
    } else {
      queryBuilder.orderBy('c.name', 'ASC');
    }

    return paginate<City>(queryBuilder, options);
  }

  async findOne(id: number) {
    const city = await this.citiesRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!city) {
      throw new NotFoundException();
    }
    return city;
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    const city = await this.findOne(id);
    if (!city) {
      throw new NotFoundException();
    }

    Object.assign(city, updateCityDto);

    return await this.citiesRepository.save(city);
  }

  async remove(id: number) {
    const city = await this.findOne(id);
    if (!city) {
      throw new NotFoundException();
    }

    return await this.citiesRepository.remove(city);
  }
}
