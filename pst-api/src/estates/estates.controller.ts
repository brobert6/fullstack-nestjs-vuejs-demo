import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, ParseIntPipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { EstatesService } from './estates.service';
import { CreateEstateDto } from './dto/create-estate.dto';
import { UpdateEstateDto } from './dto/update-estate.dto';
import { AgencyGuard } from 'src/agency/agency.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('estates')
@ApiTags('estates')
@ApiBearerAuth('JWT-auth')
@UseGuards(AgencyGuard)
export class EstatesController {
  constructor(private readonly estatesService: EstatesService) {}

  @Post()
  create(@Body(new ValidationPipe()) createEstateDto: CreateEstateDto) {
    return this.estatesService.create(createEstateDto);
  }

  @Get()
  findAll(@Query('search') search: string) {
    return this.estatesService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.estatesService.findOne(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstateDto: UpdateEstateDto) {
    return this.estatesService.update(+id, updateEstateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estatesService.remove(+id);
  }
}
