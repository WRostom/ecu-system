import { Observable } from "rxjs";

import { ApiService } from "./api.service";

export class GlobalDAOService<Object> {
  // tslint:disable: ban-types
  pageName: string;

  constructor(pageName: string, protected api: ApiService) {
    this.pageName = pageName;
  }

  getAll(): Observable<any> {
    return this.api.postRequest<any>(`${this.pageName}/getall/`, {});
  }

  getOne(newData: any): Observable<Object> {
    return this.api.postRequest<Object>(`${this.pageName}/getone/`, newData);
  }

  find(data: any, pageSize: number, pageNumber: number, sortedBy: string, order: string, filter: any): Observable<Object> {
    data = Object.assign({}, data);
    data["filter"] = filter;
    return this.api.postRequest<Object>(
      `${this.pageName}/find?pageSize=${pageSize}&pageNumber=${pageNumber}&sortedBy=${sortedBy}&order=${order}`,
      data
    );
  }

  findAll(data: any, filter: any) {
    data = Object.assign({}, data);
    data["filter"] = filter;
    return this.api.postRequest<Object>(`${this.pageName}/findAll`, data);
  }
}
