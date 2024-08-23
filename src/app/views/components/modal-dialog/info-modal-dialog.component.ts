import {ChangeDetectionStrategy, Component, EventEmitter, input, Output} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-modal-dialog',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './info-modal-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoModalDialogComponent {

  msg = input.required<string>();
  btnMsg = input<string>();
  @Output() whenBtnClick = new EventEmitter<void>();

  onBtnClick() {
    this.whenBtnClick.emit();
  }

}
