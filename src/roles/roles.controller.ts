import { Controller, Get, Post, Body } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
export class RolesController{
    constructor(private readonly rolesService: RolesService){}
    
    @Get()
    @ApiOperation({ summary: 'Get all roles' })
    @ApiResponse({ status: 200, description: 'List of roles.' })
    getRoles(){
        return this.rolesService.getAllRoles();
    }

    @Post()
    @ApiOperation({ summary: 'Create a role' })
    @ApiResponse({ status: 201, description: 'The role has been created.' })
    async createRole(@Body() dto: CreateRoleDto){
        return this.rolesService.createRole(dto.tipo);
    }

}