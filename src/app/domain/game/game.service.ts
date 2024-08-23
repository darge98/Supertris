import {inject, Injectable} from '@angular/core';
import {GameStore, getGridWinner} from "./game.store";
import {EventBusService, EventType} from "../event-bus/event-bus.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  readonly #gameStore = inject(GameStore);
  readonly #eventBus = inject(EventBusService);

  public get board() {
    return this.#gameStore.board;
  }

  public get simplifiedBoard() {
    return this.#gameStore.simplifiedBoard;
  }

  public reset() {
    this.#gameStore.reset();
  }

  public createGame(mode: 'offline' | 'online', player1: string, player2: string | undefined): string {
    const id = crypto.randomUUID();

    this.#gameStore.initGame(id, mode);
    this.#gameStore.registerPlayer1(player1);

    if (player2)
      this.#gameStore.registerPlayer2(player2);

    return id;
  }

  public makeMove(boardRowIdx: number, boardCellIdx: number, dialRowIdx: number, dialCellIdx: number) {
    if (!this.canMakeMove())
      return;

    this.#gameStore.makeMove(boardRowIdx, boardCellIdx, dialRowIdx, dialCellIdx);

    const winner = getGridWinner(this.#gameStore.simplifiedBoard());
    if (winner)
      this.#eventBus.notifyEvent(EventType.PLAYER_WIN, {winner});
  }

  private canMakeMove() {
    if (this.#gameStore.mode() === 'offline')
      return true;

    return false;
  }
}
