import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RoleDto } from './dto/role.dto';
import { JwtAuthGuard } from "src/guard/auth/auth.guard";

@ApiTags('roles')
@Controller('roles')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Get()
    @ApiOperation({ summary: 'Get all roles' })
    @ApiOkResponse({ type: [RoleDto], description: 'Lista de roles' })
    getRoles() {
        return this.rolesService.getAllRoles();
    }
    
    @Get(':id')
    @ApiOperation({ summary: 'Obtener rol por id' })
    @ApiOkResponse({ type: RoleDto, description: 'Rol con especifico id.' })
    getRoleById(@Param('id', ParseIntPipe) id: number) {
        return this.rolesService.getRolesById(id);
    }

    @Post()
    @ApiOperation({ summary: 'Creacion de un nuevo rol' })
    @ApiCreatedResponse({ type: RoleDto, description: 'El rol ha sido creado.' })
    createRole(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto.tipo);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un rol por id' })
    @ApiOkResponse({ type: RoleDto, description: 'El rol ha sido actualizado.' })
    updateRole(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateRoleDto) {
        return this.rolesService.updateRole(id, dto.tipo);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un rol por id' })
    @ApiOkResponse({ type: RoleDto, description: 'El rol ha sido eliminado.' })
    deleteRole(@Param('id', ParseIntPipe) id: number) {
        return this.rolesService.deleteRole(id);
    }

}



