import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { timeout } from "rxjs/operators";

import { environment } from "../../../environments/environment";
import { ServerTimeService } from "../services/server-time.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  httpOption = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private http: HttpClient, private serverTimeService: ServerTimeService) {}

  postRequest<T>(path: string, data: any): Observable<T> {
    return this.http.post<any>(`${environment.backendUrl}/${path}`, data, this.httpOption).pipe(
      map((res: responseObj) => {
        this.serverTimeService.setServerTime(res.currentTime);
        // if (res["type"] === "F") {
        //   throw new HttpErrorResponse({
        //     error: res["msg1"],
        //     statusText: "F",
        //     status: 2000,
        //   });
        // }
        return res.data;
      })
    );
  }

  // tslint:disable-next-line: variable-name
  // postRequestPDF<T>(path: string, trans_id: string): Observable<any> {
  //   return new Observable((Obs) => {
  //     const oReq = new XMLHttpRequest();
  //     oReq.open("POST", `${environment.backendUrl}/${path}`, true);
  //     oReq.setRequestHeader("content-type", "application/json");
  //     oReq.responseType = "arraybuffer";
  //     oReq.withCredentials = true;
  //     oReq.onload = () => {
  //       const arrayBuffer = oReq.response;
  //       const byteArray = new Uint8Array(arrayBuffer);
  //       const blob = new Blob([byteArray], {
  //         type: "application/pdf",
  //       });
  //       Obs.next(blob);
  //     };
  //     oReq.send(trans_id);
  //   });
  // }

  getRequest<T>(path: string): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/${path}`, this.httpOption).pipe(
      map((res: responseObj) => {
        // if (res["type"] === "F") {
        //   throw new HttpErrorResponse({
        //     error: res["msg1"],
        //     statusText: "F",
        //     status: 2000,
        //   });
        // }
        return res.data;
      })
    );
  }

  getRequestPDF<T>(path: string) {
    return `${environment.backendUrl}/${path}`;
  }
}

export interface responseObj {
  currentTime: string;
  data: any;
  msg1: string;
  msg2: string;
  status: string;
}
