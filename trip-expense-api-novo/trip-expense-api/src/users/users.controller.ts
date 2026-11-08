import { Controller, Get, Post, Put,Patch, Delete, Param, Body, HttpCode, HttpStatus, ParseIntPipe, UseGuards, ForbiddenException} from '@nestjs/common'
import { UsersService } from './users.service.js'
import { CreateUserDto } from './dto/create-user.dto.js'
import { UpdateUserDto } from './dto/update-user.dto.js'
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js'
import { RolesGuard } from '../auth/guards/role.guards.js'
import { Roles } from '../auth/decorators/role.decorator.js'
import { UpdateRoleDto } from './dto/update-role.dto.js'
import { GetUser } from '../auth/decorators/get-user.decorator.js'



@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto)
        const { password, ...userWithoutPassword } = user
        return userWithoutPassword
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    async findAll() {
    const users = await this.usersService.findAll()
    return users.map(user => {
        const { password, ...userWithoutPassword } = user
        return userWithoutPassword
    })
}

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() currentUser: { userId: number; email: string; role: string }
) {
    if (id !== currentUser.userId && currentUser.role !== 'ADMIN') {
        throw new ForbiddenException('Você não tem permissão para ver este usuário')
    }

    const user = await this.usersService.findOne(id)
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
}

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        const user = await this.usersService.update(id, updateUserDto)
        const { password, ...userWithoutPassword } = user
        return userWithoutPassword
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.usersService.remove(id)
    }

    @Patch(':id/role')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
    @GetUser() admin: { userId: number; email: string; role: string }
) {
    if (id === admin.userId) {
        throw new ForbiddenException('Você não pode alterar o seu próprio papel')
    }

    const user = await this.usersService.updateRole(id, updateRoleDto.role)
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
}


}