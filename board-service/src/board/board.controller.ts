// src/boards/boards.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('boards')
export class BoardController {
    constructor(private readonly boardsService: BoardService) {}

    // Endpoint para listar tableros
    @Get('user/:userId')
    async getBoards(@Param('userId') userId: string) {
        return this.boardsService.getBoardsByUser(userId);
    }

    // Endpoint para guardar un pin en un tablero
    @Post(':boardId/add-pin')
    async addPinToBoard(
        @Param('boardId') boardId: string,
        @Body('pinId') pinId: string,
    ) {
        await this.boardsService.addPinToBoard(boardId, pinId);
    }

    // Endpoint para obtener un tablero
    @Get(':boardId')
    async getBoard(@Param('boardId') boardId: string): Promise<any | null> {
        return this.boardsService.getBoard(boardId);
    }
}
