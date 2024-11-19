import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePinDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
