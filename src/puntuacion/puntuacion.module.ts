import { Module } from '@nestjs/common';
import { PuntuacionService } from './puntuacion.service';
import { PuntuacionController } from './puntuacion.controller';

@Module({
  providers: [PuntuacionService],
  controllers: [PuntuacionController]
})
export class PuntuacionModule {}
