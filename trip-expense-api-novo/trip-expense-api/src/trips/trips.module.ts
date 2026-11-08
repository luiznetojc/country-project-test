import { Module } from '@nestjs/common'
import { TripsController } from './trips.controller.js'
import { TripsService } from './trips.service.js'
import { PrismaModule } from '../prisma/prisma.module.js'
import { AuthModule } from '../auth/auth.module.js'

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [TripsController],
    providers: [TripsService]
})
export class TripsModule {}