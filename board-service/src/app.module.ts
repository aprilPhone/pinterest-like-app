import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DATABASE_URL || 'mongodb://localhost:27017/board-db',
    ),
    BoardModule,
  ],
})
export class AppModule {}
