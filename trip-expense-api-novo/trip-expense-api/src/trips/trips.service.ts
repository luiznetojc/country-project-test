import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'
import { CreateTripDto } from './dto/create-trip.dto.js'
import { UpdateTripDto } from './dto/update-trip.dto.js'

@Injectable()
export class TripsService {
    constructor(private readonly prisma: PrismaService) {}

    findAll(userId: number, role: string) {
    if (role === 'ADMIN') {
        return this.prisma.trip.findMany()
    }

    return this.prisma.trip.findMany({
        where: { userId }
    })
}

    async findOne(id: number) {
        const trip = await this.prisma.trip.findUnique({
            where: { id }
        })

        if (!trip) {
            throw new NotFoundException('Viagem não encontrada')
        }

        return trip
    }
    
    async findOneAuthorized(id: number, userId: number, role: string) {
    const trip = await this.findOne(id)

    if (trip.userId !== userId && role !== 'ADMIN') {
        throw new ForbiddenException('Você não tem permissão para ver esta viagem')
    }

    return trip
}

async create(createTripDto: CreateTripDto, requestingUserId: number, requestingRole: string) {
    let targetUserId = requestingUserId

    if (createTripDto.userId) {
        if (requestingRole !== 'ADMIN') {
            throw new ForbiddenException('Apenas administradores podem criar viagens em nome de outro usuário')
        }

        const targetUser = await this.prisma.user.findUnique({
            where: { id: createTripDto.userId }
        })

        if (!targetUser) {
            throw new NotFoundException('Usuário informado não encontrado')
        }

        targetUserId = createTripDto.userId
    }

    return this.prisma.trip.create({
        data: {
            title: createTripDto.title,
            destination: createTripDto.destination,
            startDate: new Date(createTripDto.startDate),
            endDate: new Date(createTripDto.endDate),
            userId: targetUserId
        }
    })
}

     async update(id: number, updateTripDto: UpdateTripDto, userId: number, role: string) {
        const trip = await this.findOne(id)

        if (trip.userId !== userId && role !== 'ADMIN') {
            throw new ForbiddenException('Você não tem permissão para alterar esta viagem')
        }

        return this.prisma.trip.update({
            where: { id },
            data: {
                ...updateTripDto,
                startDate: updateTripDto.startDate ? new Date(updateTripDto.startDate) : undefined,
                endDate: updateTripDto.endDate ? new Date(updateTripDto.endDate) : undefined
            }
        })
    }

    async remove(id: number, userId: number, role: string): Promise<void> {
        const trip = await this.findOne(id)

        if (trip.userId !== userId && role !== 'ADMIN') {
            throw new ForbiddenException('Você não tem permissão para excluir esta viagem')
        }

        await this.prisma.trip.delete({
            where: { id }
        })

    }
}