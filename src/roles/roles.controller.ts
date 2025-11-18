import { Controller, Get, Post, Body, Put, Param, ParseIntPipe } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { RoleDto } from './dto/role.dto';

@ApiTags('roles')
@Controller('roles')
export class RolesController{
    constructor(private readonly rolesService: RolesService){}
    
    @Get()
    @ApiOperation({ summary: 'Get all roles' })
    @ApiOkResponse({ type: [RoleDto], description: 'List of roles.' })
    getRoles(){
        return this.rolesService.getAllRoles();
    }
    

    @Post()
    @ApiOperation({ summary: 'Create a role' })
    @ApiCreatedResponse({ type: RoleDto, description: 'The role has been created.' })
    createRole(@Body() dto: CreateRoleDto){
        return this.rolesService.createRole(dto.tipo);
    }

     @Put(':id')
     @ApiOperation({ summary: 'Update a role' })
        @ApiOkResponse({ type: RoleDto, description: 'The role has been updated.' })
         updateRole(@Param('id', ParseIntPipe) id:number, @Body() dto: CreateRoleDto){
            return this.rolesService.updateRole(id, dto.tipo);
        }
    






}