import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service.js'
import { LoginDto } from './dto/login.dto.js'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async login(loginDto: LoginDto) {
        const user = await this.usersService.findByEmail(loginDto.email)

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas')
        }

        const passwordMatches = await bcrypt.compare(loginDto.password, user.password)

        if (!passwordMatches) {
            throw new UnauthorizedException('Credenciais inválidas')
        }

        const payload = { sub: user.id, email: user.email, role: user.role}

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}