import {Routes} from '@angular/router';
import {HomeComponent} from "./views/pages/home/home.component";
import {BoardComponent} from "./views/pages/board/board.component";

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'game/:id', component: BoardComponent},
];
