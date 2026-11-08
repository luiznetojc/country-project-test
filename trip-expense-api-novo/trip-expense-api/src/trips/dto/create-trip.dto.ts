import { IsString, IsNotEmpty, IsDateString, IsInt, IsOptional } from 'class-validator'

export class CreateTripDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    destination: string

    @IsDateString()
    startDate: string

    @IsDateString()
    endDate: string

    @IsOptional()
    @IsInt()
    userId?: number
}