import {
    Controller,
    Post,
    Body,
    UploadedFile,
    UseInterceptors,
    Get,
    Query,
} from '@nestjs/common';
import { PinService } from './pin.service';
import { CreatePinDto } from './dto/create-pin.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('pins')
export class PinController {
    constructor(private readonly pinsService: PinService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file')) // Usa FileInterceptor para manejar la subida de archivos
    async createPin(
        @Body() createPinDto: CreatePinDto,
        @UploadedFile() file: Express.Multer.File, // Captura el archivo subido
    ) {
        return this.pinsService.createPin(createPinDto, file); // Pasa el DTO y el archivo al servicio
    }

    @Get()
    async findAll() {
        return this.pinsService.findAll();
    }

    @Get('byIds')
    async findByIds(@Query('ids') ids: string) {
        const idsArray = ids.split(','); // Convierte la cadena de IDs en un array
        return this.pinsService.findByIds(idsArray);
    }
}
