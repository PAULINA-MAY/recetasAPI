import { Test, TestingModule } from '@nestjs/testing';
import { PuntuacionController } from './puntuacion.controller';

describe('PuntuacionController', () => {
  let controller: PuntuacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PuntuacionController],
    }).compile();

    controller = module.get<PuntuacionController>(PuntuacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
