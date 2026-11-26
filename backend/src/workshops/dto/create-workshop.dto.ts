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

    @IsInt()
    @Min(1)
    categoryId!: number;

    @IsInt()
    @Min(1)
    capacity!: number;

    @IsString()
    @IsNotEmpty()
    description!: string;
}