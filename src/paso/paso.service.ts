import { Injectable } from '@nestjs/common';
import { PasoModel } from 'generated/prisma/models';
import { ApiResponse } from 'src/global/response/response';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PasoService {
    constructor(private readonly prisma: PrismaService) { }

    async  getAllPasos():Promise<ApiResponse<PasoModel[]>> {
        try {
            
            const pasos = await this.prisma.paso.findMany();
            return {
                status: 200,
                message: 'Pasos obtenidos correctamente',
                data: pasos,
            };
        } catch (err) {
            throw err;
        }
}
    
}

