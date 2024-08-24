import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {computed} from "@angular/core";
import {Board, Mode, NextMove, NextTurn, Row, SimpleGrid, SimpleGridCellSign} from "./game.types";


const checkLine = (a: SimpleGridCellSign, b: SimpleGridCellSign, c: SimpleGridCellSign): SimpleGridCellSign => {
  return a && a === b && a === c ? a : '';
};
export const getGridWinner: (_: SimpleGrid) => SimpleGridCellSign = (grid: SimpleGrid) => {
  // Check rows
  for (let i = 0; i < 3; i++) {
    const result = checkLine(grid[i][0], grid[i][1], grid[i][2]);
    if (result) return result;
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    const result = checkLine(grid[0][i], grid[1][i], grid[2][i]);
    if (result) return result;
  }

  // Check diagonals
  const diagonal1 = checkLine(grid[0][0], grid[1][1], grid[2][2]);
  if (diagonal1) return diagonal1;

  const diagonal2 = checkLine(grid[0][2], grid[1][1], grid[2][0]);
  if (diagonal2) return diagonal2;

  return '';
}
const simplifyBoard: (_: Board) => SimpleGrid = (board: Board) => {
  return [
    [getGridWinner(board[0][0]), getGridWinner(board[0][1]), getGridWinner(board[0][2])],
    [getGridWinner(board[1][0]), getGridWinner(board[1][1]), getGridWinner(board[1][2])],
    [getGridWinner(board[2][0]), getGridWinner(board[2][1]), getGridWinner(board[2][2])],
  ]
}

export interface GameState {
  id: string;
  initialized: boolean;
  mode: Mode
  player1: string;
  player2: string;
  nextTurn: NextTurn;
  nextMove: NextMove;
  board: Board;
};

// Init values
const initSimpleGrid: () => SimpleGrid = () => [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
const initRow: () => Row = () => ({
  0: initSimpleGrid(),
  1: initSimpleGrid(),
  2: initSimpleGrid(),
})
const initialState: GameState = {
  id: '',
  initialized: false,
  mode: 'offline',
  player1: '',
  player2: '',
  board: {
    0: initRow(),
    1: initRow(),
    2: initRow(),
  },
  nextTurn: 'X',
  nextMove: 'free'
};

export const GameStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withComputed((store) => ({
    /*get: computed(() => (<GameState>{
      id: store.id(),
      player_1: store.player_1(),
      player_2: store.player_2(),
      board: store.board(),
      nextTurn: store.nextTurn(),
      nextMove: store.nextMove(),
    })),*/
    nextPlayer: computed(() => {
      return store.nextTurn() === 'X' ? store.player1() : store.player2();
    }),
    simplifiedBoard: computed(() => {
      return simplifyBoard(store.board())
    })
  })),
  withMethods((store) => ({
    reset(): void {
      patchState(store, () => ({
        id: '',
        initialized: false,
        mode: 'offline' as Mode,
        player1: '',
        player2: '',
        board: {
          0: initRow(),
          1: initRow(),
          2: initRow(),
        },
        nextTurn: 'X',
        nextMove: 'free' as NextMove
      }))
    },
    initGame(id: string, mode: 'offline' | 'online'): void {
      patchState(store, () => ({id, mode, initialized: true}));
    },
    registerPlayer1(player1: string): void {
      patchState(store, () => ({player1: player1}));
    },
    registerPlayer2(player2: string): void {
      patchState(store, () => ({player2: player2}));
    },
    makeMove(rowIdx: number, cellIdx: number, insideGridRow: number, insideGridCell: number): void {
      patchState(store, (state) => {
        const row = state.board[rowIdx as 0 | 1 | 2];
        const cell = row[cellIdx as 0 | 1 | 2];
        cell[insideGridRow][insideGridCell] = state.nextTurn as SimpleGridCellSign;

        const nextTurn: 'X' | 'O' = state.nextTurn === 'X' ? 'O' : 'X';

        let nextMove: 'free' | [number, number] = [insideGridRow, insideGridCell];
        const nextDial = state.board[insideGridRow as 0 | 1 | 2][insideGridCell as 0 | 1 | 2];
        const thereIsAWinner = getGridWinner(nextDial);
        if (thereIsAWinner)
          nextMove = 'free';

        return {
          board: {
            ...state.board,
            [rowIdx]: {
              ...state.board[rowIdx as 0 | 1 | 2],
              [cellIdx]: cell,
            }
          },
          nextTurn,
          nextMove
        }
      })
    }
  }))
);
