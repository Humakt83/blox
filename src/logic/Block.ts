import zip from 'lodash/zip';

export class Block {
  formation: number[][];

  constructor(formation: number[][]) {
    this.formation = formation;
  }
}

export interface Shape {
  name: string;
  block: Block;
}

export class TShape implements Shape {
  name = 'TShape';
  block: Block;

  constructor(color: number = 1) {
    this.block = new Block([
      [color, color, color],
      [-1, color, -1],
      [-1, color, -1],
    ]);
  }
}

export class LShape implements Shape {
  name = 'LShape';
  block: Block;

  constructor(color: number = 1) {
    this.block = new Block([
      [color, -1, -1],
      [color, -1, -1],
      [color, color, color],
    ]);
  }
}

export class UShape implements Shape {
  name = 'UShape';
  block: Block;

  constructor(color: number = 1) {
    this.block = new Block([
      [color, -1, color],
      [color, -1, color],
      [color, color, color],
    ]);
  }
}

export class BlockShape implements Shape {
  name = 'BlockShape';
  block: Block;

  constructor(color: number = 1) {
    this.block = new Block([
      [color, color],
      [color, color],
    ]);
  }
}

export class CornerShape implements Shape {
  name = 'CornerShape';
  block: Block;

  constructor(color: number = 1) {
    this.block = new Block([
      [color, color],
      [color, -1],
    ]);
  }
}

export class DiagonalShape implements Shape {
  name = 'DiagonalShape';
  block: Block;

  constructor(color: number = 1) {
    this.block = new Block([
      [color, -1],
      [-1, color],
    ]);
  }
}

export class HShape implements Shape {
  name = 'HShape';
  block: Block;

  constructor(color: number = 1) {
    this.block = new Block([
      [color, -1, color],
      [color, color, color],
      [color, -1, color],
    ]);
  }
}

export class XShape implements Shape {
  name = 'XShape';
  block: Block;

  constructor(color: number = 1) {
    this.block = new Block([
      [color, -1, color],
      [-1, color, -1],
      [color, -1, color],
    ]);
  }
}

export class YShape implements Shape {
  name = 'YShape';
  block: Block;

  constructor(color: number = 1) {
    this.block = new Block([
      [color, -1, color],
      [-1, color, -1],
      [color, -1, -1],
    ]);
  }
}

export class DotShape implements Shape {
  name = 'DotShape';
  block: Block;

  constructor(color: number = 1) {
    this.block = new Block([[color]]);
  }
}

export enum Direction {
  CLOCKWISE,
  COUNTERCLOCKWISE,
}

export function rotate(shape: Shape, direction: Direction): Shape {
  const transpose = (formation: number[][]) =>
    <Array<Array<number>>>zip(...formation);
  const reverse = (formation: number[][]) =>
    formation.map((row: number[]) => row.reverse());
  const formation =
    direction === Direction.CLOCKWISE
      ? reverse(transpose(shape.block.formation))
      : transpose(reverse(shape.block.formation));
  return Object.assign({}, shape, {block: new Block(formation)});
}

export function randomShape(pieces: Shape[]): Shape {
  return pieces[Math.floor(Math.random() * pieces.length)];
}

export function getShapes(color: number = 1): Shape[] {
  return [
    TShape,
    LShape,
    UShape,
    BlockShape,
    CornerShape,
    HShape,
    DotShape,
    DiagonalShape,
    XShape,
    YShape,
  ].map(shape => new shape(color));
}
