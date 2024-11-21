import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { Board, BoardSchema } from './schemas/board.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
    HttpModule,
  ],
  providers: [BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
