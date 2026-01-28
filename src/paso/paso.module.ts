import { Module } from '@nestjs/common';
import { PasoService } from './paso.service';
import { PasoController } from './paso.controller';

@Module({
  providers: [PasoService],
  controllers: [PasoController]
})
export class PasoModule {}
