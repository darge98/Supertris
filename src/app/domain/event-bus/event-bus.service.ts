import {Injectable} from '@angular/core';
import {filter, map, Subject} from "rxjs";

export enum EventType {
  PLAYER_WIN = 'PLAYER_WIN',
}

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  #eventSubject$ = new Subject<{ eventType: EventType, additionalParams: any }>();

  public listenEvent(type: EventType) {
    return this.#eventSubject$.pipe(
      filter(e => e.eventType === type),
      map(e => e.additionalParams)
    )
  }

  notifyEvent(eventType: EventType, additionalParams?: any) {
    this.#eventSubject$.next({eventType, additionalParams});
  }
}
