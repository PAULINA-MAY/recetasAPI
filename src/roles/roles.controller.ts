import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto, ResponseCreateRoleDto } from './dto/create-role.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from "src/guard/auth/auth.guard";

import { ResponseUpdateRoleDto, UpdateRoleDto } from "./dto/update-role.dto";
import { DeleteRoleDto, ResponseDeleteRoleDto } from "./dto/delete-role.dto";

@ApiTags('roles')
@Controller('roles')
 @ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard) 
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Get('Roles/AC')
    @ApiOperation({ summary: 'Obtener todos los roles activos' })
    @ApiOkResponse({ type: [ResponseCreateRoleDto], description: 'Lista de roles activos.' })
    getRolesAc() {
        return this.rolesService.getRolesAc();
    }

        @Get('Roles/BA')
    @ApiOperation({ summary: 'Obtener todos los roles inactivos' })
    @ApiOkResponse({ type: [ResponseDeleteRoleDto], description: 'Lista de roles inactivos.' })
    getRolesBa() {
        return this.rolesService.getRolesBa();
    }



    @Get(':id')
    @ApiOperation({ summary: 'Obtener rol por id' })
    @ApiOkResponse({ type: ResponseCreateRoleDto, description: 'Rol con especifico id.' })
    getRoleById(@Param('id', ParseIntPipe) id: number) {
        return this.rolesService.getRolesById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Creacion de un nuevo rol' })
    @ApiCreatedResponse({ type: ResponseCreateRoleDto, description: 'El rol ha sido creado.' })
    createRole(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto);
    }

    @Put(':idRol/update')
    @ApiOperation({ summary: 'Actualizar un rol por id' })
    @ApiOkResponse({ type: ResponseUpdateRoleDto, description: 'El rol ha sido actualizado.' })
    updateRole(@Param('idRol', ParseIntPipe) idRol: number, @Body() dto: UpdateRoleDto) {
        return this.rolesService.updateRole(idRol, dto);
    }

    @Delete(':idRol/delete')
    @ApiOperation({ summary: 'Eliminar un rol por id' })
    @ApiOkResponse({ type: ResponseDeleteRoleDto, description: 'El rol ha sido eliminado.' })
    deleteRole(@Param('idRol', ParseIntPipe) idRol: number, @Body() dto: DeleteRoleDto) {
        return this.rolesService.deleteRole(idRol, dto);
    }

}



