import {
    IsInt,
    IsNotEmpty,
    IsString,
    MaxLength,
    Min
} from 'class-validator';

export class CreateWorkshopDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    title!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    category!: string;

    @IsInt()
    @Min(1)
    capacity!: number;

    @IsString()
    @IsNotEmpty()
    description!: string;
}