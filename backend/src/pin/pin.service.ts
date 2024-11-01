import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pin } from './schemas/pin.schema';
import { UploadService } from '../upload/upload.service';
import { CreatePinDto } from './dto/create-pin.dto';

@Injectable()
export class PinService {
    constructor(
        @InjectModel(Pin.name) private pinModel: Model<Pin>,
        private readonly uploadService: UploadService,
    ) {}

    async createPin(
        createPinDto: CreatePinDto,
        file: Express.Multer.File,
    ): Promise<Pin> {
        const { title, description } = createPinDto;
        const image = await this.uploadService.uploadFile(file);
        const newPin = new this.pinModel({
            title,
            description,
            imageUrl: image.Location,
        });

        try {
            return await newPin.save();
        } catch (error) {
            console.error('Error saving pin:', error);
            throw new Error('Error saving pin');
        }
    }

    async findAll(): Promise<Pin[]> {
        return this.pinModel.find().exec();
    }
}
