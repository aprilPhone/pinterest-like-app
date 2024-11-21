// src/boards/schemas/board.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Board extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    userId: string; // Hardcodeado en este caso testigo

    @Prop({ type: [String], default: [] }) // IDs de los pins guardados
    pins: string[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
