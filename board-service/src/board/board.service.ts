// src/boards/boards.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board } from './schemas/board.schema';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private readonly boardModel: Model<Board>,
    private readonly httpService: HttpService,
  ) {}

  // Lista los tableros del usuario
  async getBoardsByUser(userId: string): Promise<Board[]> {
    return this.boardModel.find({ userId }).exec();
  }

  async getBoard(boardId: string): Promise<any | null> {
    // Busca el tablero por su ID
    const board = await this.boardModel.findById(boardId).exec();

    if (!board) {
      return null; // Si no se encuentra el tablero, devuelve null
    }

    // Obtener los pines asociados al tablero usando sus IDs
    const pins = await this.httpService
      .get('http://localhost:3001/pins/byIds', {
        params: {
          ids: board.pins.join(','), // Convertir el array de IDs a una cadena separada por comas
        },
      })
      .toPromise()
      .then((response) => response.data);

    return {
      ...board.toObject(),
      pins: pins, // Añadir los pines al objeto del tablero
    };
  }

  // Agrega un pin a un tablero
  async addPinToBoard(boardId: string, pinId: string): Promise<void> {
    await this.boardModel.findByIdAndUpdate(boardId, {
      $addToSet: { pins: pinId },
    });
  }
}
