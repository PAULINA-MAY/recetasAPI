import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, Req, Patch } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto, ResponseCreateRoleDto } from './dto/create-role.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from "src/guard/auth/auth.guard";

import { ResponseUpdateRoleDto, UpdateRoleDto } from "./dto/update-role.dto";
import { DeleteRoleDto, ResponseDeleteRoleDto } from "./dto/delete-role.dto";
import { UsuariosDto } from "src/usuarios/dto/usuarios.dto";
import { RoleDto } from "./dto/role.dto";

@ApiTags('roles')
@Controller('roles')
 @ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard) 
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }



            @Get('All')
            @ApiOperation({ summary: 'Obtener todos los roles' })
            @ApiOkResponse({ type: ResponseCreateRoleDto, description: 'Lista de Roles' })
            getRoles() {
                return this.rolesService.getAllRoles();
            }
            
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



    @Get(':idRol')
    @ApiOperation({ summary: 'Obtener rol por ID' })
    @ApiOkResponse({ type: ResponseCreateRoleDto, description: 'Rol con especifico ID.' })
    getRoleById(@Param('idRol', ParseIntPipe) id: number) {
        return this.rolesService.getRolesById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Creacion de un nuevo rol' })
    @ApiCreatedResponse({ type: ResponseCreateRoleDto, description: 'El rol ha sido creado.' })
    createRole(
        @Req() req: any,
        @Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto, req.user.nombreCompleto);
    }

    @Put(':idRol/update')
    @ApiOperation({ summary: 'Actualizar un rol por ID' })
    @ApiOkResponse({ type: ResponseUpdateRoleDto, description: 'El rol ha sido actualizado.' })
    updateRole(@Param('idRol', ParseIntPipe) idRol: number, @Body() dto: UpdateRoleDto, @Req() req: any) {
        return this.rolesService.updateRole(idRol, dto, req.user.nombreCompleto);
    }

    @Patch(':idRol/baja')
    @ApiOperation({ summary: 'Dar de baja un rol por ID' })
    @ApiOkResponse({ type: ResponseDeleteRoleDto, description: 'El rol ha sido dado de baja.' })
    deleteRole(@Param('idRol', ParseIntPipe) idRol: number, @Req() req: any) {
        return this.rolesService.deleteRole(idRol, req.user.nombreCompleto);
    }

    @Patch(':idRol/activar')
    @ApiOperation({ summary: 'Dar de alta un rol por ID' })
    @ApiOkResponse({ type: ResponseUpdateRoleDto, description: 'El rol ha sido dado de alta.' })
    restoreRole(@Param('idRol', ParseIntPipe) idRol: number, @Req() req: any) {
        return this.rolesService.activarRole(idRol, req.user.nombreCompleto);
    }

}



