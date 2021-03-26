import {randomShape, Shape, rotate, Direction} from './Block';
import {getMovableBoard, placePiece} from './Blox';

function getPossibleMoves(board: number[][], shape: Shape) : {y: number, x: number}[] {
  const movableBoard = getMovableBoard(board, shape);
  const moves : {y: number, x: number}[] = [];
  movableBoard.forEach((row: boolean[], index: number) => {
    row.forEach((column: boolean, indexCol: number) => {
      if (column) {
        moves.push({y: index, x: indexCol});
      }
    })
  });
  return moves;
}

export function makeAIMove(board: number[][], aiColor: number = 2) : number[][] {
  const shape = randomShape(aiColor);
  let moves : {y: number, x: number}[] = [];
  let timesRotated = 0;
  while (moves.length < 1 && timesRotated < 3) {
    moves = getPossibleMoves(board, shape);
    if (moves.length < 1) {
      shape.block = rotate(shape, Direction.CLOCKWISE);
      timesRotated++;
    }
  }
  if (moves.length > 0) {
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    return placePiece(board, shape, randomMove.y, randomMove.x);
  }
  return board;
}