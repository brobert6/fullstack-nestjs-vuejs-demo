import { Test, TestingModule } from '@nestjs/testing';
import { EstatesService } from './estates.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Estate } from './entities/estate.entity';
import { EntityManager, Repository } from 'typeorm';

describe('EstatesService', () => {
  let service: EstatesService;
  let estatesRepository: Repository<Estate>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstatesService,
        {
          provide: getRepositoryToken(Estate),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: EntityManager,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<EstatesService>(EstatesService);
    estatesRepository = module.get<Repository<Estate>>(getRepositoryToken(Estate));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('findAll', async () => {
    await service.findAll('');
    expect(estatesRepository.find).toHaveBeenCalled();
  });
});
