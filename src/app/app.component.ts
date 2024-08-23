import {Component, DestroyRef, inject, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {EventBusService, EventType} from "./domain/event-bus/event-bus.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {InfoModalDialogComponent} from "./views/components/modal-dialog/info-modal-dialog.component";
import {GameService} from "./domain/game/game.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InfoModalDialogComponent],
  template: `
    <div
      class="min-h-screen bg-gradient-to-br from-purple-700 via-pink-600 to-red-400 flex flex-col items-center justify-center overflow-hidden relative">
      <router-outlet></router-outlet>

      <!-- another.component.html -->
      @if (isModalOpen()) {
        <div class="modal">
          <app-modal-dialog [msg]="modalMsg()" [btnMsg]="'Go back to homepage'"
                            (whenBtnClick)="onModalBtnClick()"></app-modal-dialog>
        </div>
      }
    </div>
  `,
})
export class AppComponent {

  readonly #gameService = inject(GameService);
  readonly #eventBus = inject(EventBusService);
  readonly #destroy = inject(DestroyRef);
  readonly #router = inject(Router);

  isModalOpen = signal(false);
  modalMsg = signal("");

  constructor() {
    this.#eventBus.listenEvent(EventType.PLAYER_WIN).pipe(
      takeUntilDestroyed(this.#destroy)
    ).subscribe(additionalInfo => {
      this.isModalOpen.set(true);
      this.modalMsg.set(`${additionalInfo.winner} win the game!`);
    })
  }

  onModalBtnClick() {
    this.isModalOpen.set(false);
    this.#gameService.reset();
    this.#router.navigate(['/home']).finally();
  }
}
