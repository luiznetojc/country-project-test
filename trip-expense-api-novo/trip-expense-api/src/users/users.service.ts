import { Injectable, NotFoundException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service.js'
import { CreateUserDto } from './dto/create-user.dto.js'
import { UpdateUserDto } from './dto/update-user.dto.js'
@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

        return this.prisma.user.create({
            data: {
                ...createUserDto,
                password: hashedPassword
            }
        })
    }

    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { trips: true }
        })

        if (!user) {
            throw new NotFoundException('Usuário não encontrado')
        }

        return user
    }

    findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email }
        })
    }

    async findAll() {
    return this.prisma.user.findMany()
    }


    async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id) 

    return this.prisma.user.update({
        where: { id },
        data: updateUserDto
    })
}

async remove(id: number): Promise<void> {
    await this.findOne(id)

    await this.prisma.user.delete({
        where: { id }
    })
}
async updateRole(id: number, role: 'USER' | 'ADMIN') {
    await this.findOne(id)

    return this.prisma.user.update({
            where: { id },
            data: { role }
        })
    }
    findById(id: number) {
    return this.prisma.user.findUnique({
        where: { id }
    })
}
}