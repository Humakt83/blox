import {ROWS, COLUMNS} from '../Constants';
import {Shape} from './Block';

export function createBoard(): number[][] {
  let board: number[][] = new Array<Array<number>>(ROWS);
  for (let i = 0; i < ROWS; i++) {
    board[i] = new Array<number>(COLUMNS).fill(0);
  }
  return board;
}

export function placePiece(
  board: number[][],
  piece: Shape,
  row: number,
  column: number,
  yModifier: number = 0,
  xModifier: number = 0,
): number[][] {
  const newBoard = [...board];
  const formation = piece.block.formation;
  for (let y = row; y < row + formation.length; y++) {
    for (let x = column; x < column + formation[0].length; x++) {
      if (formation[y - row][x - column] > 0) {
        newBoard[y - yModifier][x - xModifier] = formation[y - row][x - column];
      }
    }
  }
  return newBoard;
}

function pieceCanFitSlot(boardSlot: number[][], piece: Shape): boolean {
  const formation = piece.block.formation;
  let fits = true;
  for (let y = 0; y < boardSlot.length; y++) {
    for (let x = 0; x < boardSlot[0].length; x++) {
      fits = fits && (formation[y][x] < 1 || boardSlot[y][x] === 0);
    }
  }
  return fits;
}

function sliceASlot(
  board: number[][],
  formation: number[][],
  row: number,
  column: number,
  yModifier: number,
  xModifier: number,
): number[][] {
  const boardSlot = new Array<Array<number>>(formation.length);
  for (let i = 0; i < formation[0].length; i++) {
    boardSlot[i] = new Array<number>(formation[0].length).fill(0);
  }
  for (let y = 0; y < formation.length; y++) {
    for (let x = 0; x < formation[0].length; x++) {
      boardSlot[y][x] = board[row + y - yModifier][column + x - xModifier];
    }
  }
  return boardSlot;
}

export function getMovableBoard(
  board: number[][],
  piece: Shape,
  yModifier: number = 0,
  xModifier: number = 0,
): boolean[][] {
  const movableBoard: boolean[][] = getEmptyMovableBoard();
  const formation = piece.block.formation;
  board.forEach((row: number[], y: number) => {
    row.forEach((column: number, x: number) => {
      let movable = column === 0;
      movable =
        movable &&
        y - yModifier >= 0 &&
        x - xModifier >= 0 &&
        formation.length + y - yModifier <= board.length &&
        formation[0].length + x - xModifier <= board[0].length;
      if (movable) {
        movable =
          movable &&
          pieceCanFitSlot(
            sliceASlot(board, formation, y, x, yModifier, xModifier),
            piece,
          );
      }
      movableBoard[y][x] = movable;
    });
  });
  return movableBoard;
}

export function getEmptyMovableBoard(): boolean[][] {
  const movableBoard: boolean[][] = new Array<Array<boolean>>(ROWS);
  for (let i = 0; i < ROWS; i++) {
    movableBoard[i] = new Array<boolean>(COLUMNS).fill(false);
  }
  return movableBoard;
}
