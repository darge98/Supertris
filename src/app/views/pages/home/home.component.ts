import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {GameService} from "../../../domain/game/game.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styles: [
    `
      .cool-title {
        font-family: "SuperPixel", Arial, Helvetica, sans-serif;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  readonly #router = inject(Router);
  readonly #gameService = inject(GameService);

  startGame(player1: string, player2: string | undefined, mode: 'offline' | 'online'): void {
    const id = this.#gameService.createGame(mode, player1, player2);
    this.#router.navigate(['/game/' + id]).finally();
  }

}
