import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { timeout } from "rxjs/operators";

import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  httpOption = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private http: HttpClient) {}

  postRequest<T>(path: string, data: any): Observable<T> {
    return this.http
      .post<T>(`${environment.backendUrl}/${path}`, data, this.httpOption)
      .pipe(
        map((res) => {
          // if (res["type"] === "F") {
          //   throw new HttpErrorResponse({
          //     error: res["msg1"],
          //     statusText: "F",
          //     status: 2000,
          //   });
          // }
          return res;
        })
      )
      .pipe(timeout(600000));
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

  getRequest<T>(path: string): Observable<T> {
    return this.http.get<T>(`${environment.backendUrl}/${path}`, this.httpOption).pipe(
      map((res) => {
        // if (res["type"] === "F") {
        //   throw new HttpErrorResponse({
        //     error: res["msg1"],
        //     statusText: "F",
        //     status: 2000,
        //   });
        // }
        return res;
      })
    );
  }

  getRequestPDF<T>(path: string) {
    return `${environment.backendUrl}/${path}`;
  }
}
