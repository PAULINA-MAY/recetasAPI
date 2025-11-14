import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';


@Module({
controllers: [AppController],
  providers: [AppService],
  imports: [RolesModule],
})
export class AppModule {}
