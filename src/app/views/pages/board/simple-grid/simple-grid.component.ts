import {ChangeDetectionStrategy, Component, EventEmitter, input, Output} from '@angular/core';
import {SimpleGrid} from "../../../../domain/game/game.store";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-simple-grid',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './simple-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleGridComponent {

  dial = input.required<SimpleGrid>();
  dialRowIdx = input.required<number>();
  dialCellIdx = input.required<number>();
  enabled = input.required<boolean>();
  @Output() whenCellClicked = new EventEmitter<{
    board: { cell: number, row: number },
    dial: { cell: number, row: number }
  }>();

  onCellClicked(row: number, cell: number) {
    if (!this.enabled())
      return;

    if (this.dial()[row][cell])
      return;

    this.whenCellClicked.emit({
      board: {cell: this.dialCellIdx(), row: this.dialRowIdx()},
      dial: {cell, row}
    });
  }
}
