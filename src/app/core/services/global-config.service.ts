import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ConfigDataService {
  private globalConfig$: BehaviorSubject<any> = new BehaviorSubject({});
  constructor() {}

  setConfigData(time: any) {
    this.globalConfig$.next(time);
  }

  getConfigData(): Observable<any> {
    return this.globalConfig$;
  }
}
