import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, ParseIntPipe, UseGuards } from '@nestjs/common'
import { TripsService } from './trips.service.js'
import { CreateTripDto } from './dto/create-trip.dto.js'
import { UpdateTripDto } from './dto/update-trip.dto.js'
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js'
import { GetUser } from '../auth/decorators/get-user.decorator.js'

@Controller('trips')
@UseGuards(JwtAuthGuard)
export class TripsController {
    constructor(private readonly tripsService: TripsService) {}

    @Get()
    findAll(@GetUser() user: { userId: number; email: string; role: string }) {
    return this.tripsService.findAll(user.userId, user.role)
}

    @Get(':id')
    findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: { userId: number; email: string; role: string }
    ) {
    return this.tripsService.findOneAuthorized(id, user.userId, user.role)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(
        @Body() createTripDto: CreateTripDto,
        @GetUser() user: { userId: number; email: string; role: string }
    ) {
        return this.tripsService.create(createTripDto, user.userId,user.role)
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTripDto: UpdateTripDto,
        @GetUser() user: { userId: number; email: string , role: string}
    ) {
        return this.tripsService.update(id, updateTripDto, user.userId,user.role)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: { userId: number; email: string, role:string }
    ) {
        return this.tripsService.remove(id, user.userId, user.role)
    }
}