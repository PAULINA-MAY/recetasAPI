import { Injectable } from '@nestjs/common';
import { PuntuacionModel } from 'generated/prisma/models';
import { ApiResponse } from 'src/global/response/response';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PuntuacionService {
    constructor(private readonly prisma: PrismaService) { }


    async getPuntuationByRecetaIdAndUsuario(recetaId: number, usuarioId: number): Promise<ApiResponse<PuntuacionModel[]>> {
        try {
            const puntuacion = await this.prisma.puntuacion.findMany({
                where: {
                    RecetaIngredienteFKId: recetaId,
                    IdUsuarioFK: usuarioId
                }
            });
            if (puntuacion.length === 0 || !puntuacion) {
                return {
                    status: 404,
                    message: 'No se encontraron puntuaciones para la receta y usuario especificados',
                    data: []
                };
            }

            return {
                status: 200,
                message: 'Puntuaciones obtenidas correctamente',
                data: puntuacion,
            };
        } catch (err) {
            throw err;
        }
    }

    async getPuntuation(id: number): Promise<ApiResponse<PuntuacionModel[]>> {
        try {
            const puntuacion = await this.prisma.puntuacion.findMany({
                where: {
                     puntuacionId: id
                }
            });
            if (puntuacion.length === 0 || !puntuacion) {
                return {
                    status: 404,
                    message: 'No se encontró la puntuación con el ID especificado',
                    data: []
                };
            }

            return {
                status: 200,
                message: 'Puntuación obtenida correctamente',
                data: puntuacion,
            };
        } catch (err) {
            throw err;
        }
    }

    
}