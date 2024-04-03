import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

    await this.citiesRepository.save(city);
  }

  async remove(id: number) {
    const city = await this.findOne(id);
    if (!city) {
      throw new NotFoundException();
    }

    return await this.citiesRepository.remove(city);
  }
}
