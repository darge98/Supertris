// Types
export interface Board {
  0: Row
  1: Row
  2: Row
}

export interface Row {
  0: Cell
  1: Cell
  2: Cell
}

export type Cell = SimpleGrid;
export type SimpleGridCellSign = 'X' | 'O' | '';
export type SimpleGrid = [
  [SimpleGridCellSign, SimpleGridCellSign, SimpleGridCellSign],
  [SimpleGridCellSign, SimpleGridCellSign, SimpleGridCellSign],
  [SimpleGridCellSign, SimpleGridCellSign, SimpleGridCellSign]
];
export type Mode = 'offline' | 'online';
export type NextTurn = Omit<SimpleGridCellSign, ''>;
export type NextMove = 'free' | [number, number];
