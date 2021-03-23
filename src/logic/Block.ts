export class Block {
  formation: Number[][];  

  constructor(formation: Number[][]) {
    this.formation = formation;
  }
}

export interface Shape {
  block: Block;
}

export class TShape implements Shape {
  block: Block = new Block([
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0]
    ]);
}

export class LShape implements Shape {
  block: Block = new Block([
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1]
    ]);
}

export class UShape implements Shape {
  block: Block = new Block([
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1]
    ]);
}