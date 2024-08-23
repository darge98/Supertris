import {ChangeDetectionStrategy, Component, inject, Signal} from '@angular/core';
import {GameService} from "../../../domain/game/game.service";
import {KeyValuePipe, NgClass, NgForOf} from "@angular/common";
import {SimpleGridComponent} from "./simple-grid/simple-grid.component";
import {Board} from "../../../domain/game/game.store";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    KeyValuePipe,
    NgForOf,
    NgClass,
    SimpleGridComponent
  ],
  templateUrl: './board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {

  readonly #gameService = inject(GameService);

  board: Signal<Board> = this.#gameService.board;
  simplifiedBoard = this.#gameService.simplifiedBoard;

  getDial(row: number, cell: number) {
    // @ts-ignore
    return this.board()[row][cell];
  }


  onCellClicked($event: { board: { cell: number; row: number }; dial: { cell: number; row: number } }) {
    this.#gameService.makeMove($event.board.row, $event.board.cell, $event.dial.row, $event.dial.cell)
  }
}
