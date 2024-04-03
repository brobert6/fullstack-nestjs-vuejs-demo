import { Test, TestingModule } from '@nestjs/testing';
import { EstatesController } from './estates.controller';
import { EstatesService } from './estates.service';

describe('EstatesController', () => {
  let controller: EstatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstatesController],
      providers: [EstatesService],
    }).compile();

    controller = module.get<EstatesController>(EstatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
