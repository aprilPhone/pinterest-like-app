import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PinService } from './pin.service';
import { PinController } from './pin.controller';
import { Pin, PinSchema } from './schemas/pin.schema';
import { UploadModule } from '../upload/upload.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Pin.name, schema: PinSchema }]),
        UploadModule,
    ],
    providers: [PinService],
    controllers: [PinController],
})
export class PinModule {}
