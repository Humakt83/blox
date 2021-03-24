import zip from 'lodash/zip';

export class Block {
  formation: number[][];  

  constructor(formation: number[][]) {
    this.formation = formation;
  }

}

export interface Shape {
  block: Block;
}

export class TShape implements Shape {
  block: Block = new Block([
    [1, 1, 1],
    [-1, 1, -1],
    [-1, 1, -1]
    ]);
}

export class LShape implements Shape {
  block: Block = new Block([
    [-1, 1, -1],
    [-1, 1, -1],
    [-1, 1, 1]
    ]);
}

export class UShape implements Shape {
  block: Block = new Block([
    [1, -1, 1],
    [1, -1, 1],
    [1, 1, 1]
    ]);
}

export enum Direction {
  CLOCKWISE, COUNTERCLOCKWISE
}

export function rotate(shape: Shape, direction: Direction): Shape {
  const transpose = (formation: number[][]) =>  <Array<Array<number>>> zip(...formation);
  const reverse = (formation: number[][]) => formation.map((row: number[]) => row.reverse());
  const formation = direction === Direction.CLOCKWISE
    ? reverse(transpose(shape.block.formation))
    : transpose(reverse(shape.block.formation));
  return Object.assign({}, shape, {block: new Block(formation)});
}