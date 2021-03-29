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

export function makeAIMove(board: number[][], shapes: Shape[]) : {board: number[][], usedShape: Shape | null} {
  if (shapes.length < 1) {
    return {board, usedShape: null};
  }
  let shape = randomShape(shapes);
  let moves : {y: number, x: number}[] = [];
  let timesRotated = 0;
  let timesShapePicked = 0;
  while (moves.length < 1 && timesShapePicked < shapes.length) {
    while (moves.length < 1 && timesRotated < 3) {
      moves = getPossibleMoves(board, shape);
      if (moves.length < 1) {
        shape = rotate(shape, Direction.CLOCKWISE);
        timesRotated++;
      }
    }
    if (moves.length < 1) {
      shape = shapes[timesShapePicked];
      timesShapePicked ++;
    }
  }
  if (moves.length > 0) {
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    return {board: placePiece(board, shape, randomMove.y, randomMove.x), usedShape: shape};
  }
  return {board, usedShape: null};
}