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
      class="min-h-screen bg-[#efefef] flex flex-col items-center justify-center overflow-hidden relative">

      <div class="absolute w-80 h-80 bg-[#c49cd9] rounded-full opacity-50 top-10 right-20 filter blur-lg"></div>
      <div class="absolute w-96 h-96 bg-[#c49cd9] rounded-full opacity-30 top-32 left-20 filter blur-lg"></div>
      <div class="absolute w-96 h-96 bg-[#c49cd9] rounded-full opacity-40 bottom-12 right-44 filter blur-lg"></div>

      <router-outlet></router-outlet>

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
      if(additionalInfo) {
        this.modalMsg.set(`${additionalInfo['winner']} win the game!`);
      }
    })
  }

  onModalBtnClick() {
    this.isModalOpen.set(false);
    this.#gameService.reset();
    this.#router.navigate(['/home']).finally();
  }
}
