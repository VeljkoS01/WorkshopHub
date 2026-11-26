import {
    IsISO8601,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength
} from 'class-validator';

export class CreateSessionDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    title!: string;

    @IsISO8601({ strict: true, strictSeparator: true })
    @Matches(/T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/)
    startsAt!: string;

    @IsISO8601({ strict: true, strictSeparator: true })
    @Matches(/T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/)
    endsAt!: string;
}