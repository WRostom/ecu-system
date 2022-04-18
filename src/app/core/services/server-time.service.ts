import { Injectable } from "@angular/core";

import { Observable, ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ServerTimeService {
  private serverTime$: ReplaySubject<string>;
  constructor() {
    this.serverTime$ = new ReplaySubject<string>();
  }

  setServerTime(time: string) {
    this.serverTime$.next(time);
  }

  getServerTime(): Observable<string> {
    return this.serverTime$.asObservable();
  }
}
