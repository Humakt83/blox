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