import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { s3 } from 'config/s3.config';

@Injectable()
export class UploadService {
    async uploadFile(
        file: Express.Multer.File,
    ): Promise<S3.ManagedUpload.SendData> {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `images/${Date.now()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        try {
            const uploadResult = await s3.upload(params).promise();
            return uploadResult; // Asegúrate de que se retorna `uploadResult` aquí
        } catch (error) {
            throw new Error(`File upload failed: ${error.message}`);
        }
    }
}
