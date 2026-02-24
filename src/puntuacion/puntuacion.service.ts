import { Injectable } from '@nestjs/common';
import { PuntuacionModel } from 'generated/prisma/models';
import { ApiResponse } from 'src/global/response/response';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePuntuacionDto } from './dto/createPuntuacion.dto';
import { UpdatePuntuacionDto } from './dto/updatePuntuacion.dto';

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

    async createPuntuacion(dto:CreatePuntuacionDto): Promise<ApiResponse<PuntuacionModel>> {
        try {
              const res =   await this.prisma.puntuacion.create({
                    data: {
                        IdUsuarioFK: dto.IdUsuarioFK,       
                        RecetaIngredienteFKId: dto.RecetaIngredienteFKId,
                        puntuacion: dto.puntuacion,
                    },  
                });
  
                return {
                    status: 201,
                    message: 'Puntuación creada correctamente',
                    data: res,
                };
            
        } catch (err) {
            throw err;
        }
    }

    async updatePuntuacion(idReceta: number,idUsuario:number, dto: UpdatePuntuacionDto): Promise<ApiResponse<PuntuacionModel>> {
        try {
            const res = await this.prisma.puntuacion.update({
                where: {
                    puntuacionId: idReceta,
                },
                data: {
                    IdUsuarioFK:idUsuario,       
                    RecetaIngredienteFKId: idReceta,
                    puntuacion: dto.puntuacion,
                },
            });

            return {
                status: 200,
                message: 'Puntuación actualizada correctamente',
                data: res,
            };
        } catch (err) {
            throw err;
        }
    }

 }
