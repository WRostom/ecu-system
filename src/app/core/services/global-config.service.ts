import { DIR_DOCUMENT_FACTORY } from "@angular/cdk/bidi/dir-document-token";
import { KeyValue } from "@angular/common";
import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ConfigDataService {
  private globalConfig$: BehaviorSubject<any> = new BehaviorSubject({});
  private academicYear$: BehaviorSubject<string> = new BehaviorSubject("");
  constructor() {}

  setConfigData(data: KeyValue<any, any>[]) {
    this.academicYear$.next(data.find((res) => res.key == "ACADEMIC_YEAR").value);
    this.globalConfig$.next(data);
  }

  getAcademicYear() {
    return this.academicYear$;
  }

  getConfigData(): Observable<any> {
    return this.globalConfig$;
  }
}
