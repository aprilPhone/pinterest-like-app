import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadModule } from './upload/upload.module';
import { PinModule } from './pin/pin.module';

@Module({
    imports: [
        MongooseModule.forRoot(
            process.env.DATABASE_URL || 'mongodb://localhost:27017/pin-db',
        ),
        UploadModule,
        PinModule,
    ],
})
export class AppModule {}
