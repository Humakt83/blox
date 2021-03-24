import { ROWS, COLUMNS } from '../Constants';
import { Shape } from './Block';

export function createBoard(): number[][] {
  let board: number[][] = new Array<Array<number>>(ROWS);
  for (let i = 0; i < ROWS; i++) {
    board[i] = new Array<number>(COLUMNS).fill(0);
  }
  return board;
}

export function placePiece(board: number[][], piece: Shape, row: number, column: number): number[][] {
  const newBoard = [...board];
  const formation = piece.block.formation;
  const yAdjustment = ROWS < (row + formation.length) ? Math.abs(ROWS - (row + formation.length)) : 0
  const xAdjustment = COLUMNS < (column + formation[0].length) ? Math.abs(COLUMNS - (column + formation[0].length)) : 0
  for (let y = row; y < row + formation.length; y++) {
    for (let x = column; x < column + formation[0].length; x++) {
      if (formation[y-row][x-column] > 0) {
        newBoard[y-yAdjustment][x-xAdjustment] = formation[y-row][x-column];
      }
    }
  }
  return newBoard;
}

function pieceCanFitSlot(boardSlot: number[][], piece: Shape): boolean {
  const formation = piece.block.formation;
  let fits = true;
  for (let y = 0; y < boardSlot.length; y++) {
    for(let x = 0; x < boardSlot[0].length; x++) {
      fits = fits && (formation[y][x] < 1 || boardSlot[y][x] === 0);
    }
  }
  return fits;
}

function sliceASlot(board: number[][], formation: number[][], row: number, column: number): number[][] {
  const boardSlot = new Array<Array<number>>(formation.length);
  for (let i = 0; i < formation[0].length; i++) {
    boardSlot[i] = new Array<number>(formation[0].length).fill(0);
  }
  for (let y = 0; y < formation.length; y++) {
    for (let x = 0; x < formation[0].length; x++) {
      boardSlot[y][x] = board[row + y][column + x];
    }
  }
  return boardSlot;
}

export function getMovableBoard(board: number[][], piece:Shape): boolean[][] {
  const movableBoard: boolean[][] = new Array<Array<boolean>>(ROWS);
  for (let i = 0; i < ROWS; i++) {
    movableBoard[i] = new Array<boolean>(COLUMNS).fill(false);
  }
  board.forEach((row: number[], y: number) => {
    row.forEach((column: number, x: number) => {
      let movable = column === 0;
      const formation = piece.block.formation;
      movable = movable && formation.length + y <= board.length && formation[0].length + x <= board[0].length;
      movable = movable && pieceCanFitSlot(sliceASlot(board, formation, y, x), piece);
      movableBoard[y][x] = movable;
    });
  });
  return movableBoard;
}
