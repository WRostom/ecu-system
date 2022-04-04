import { Observable } from "rxjs";

import { ApiService } from "./api.service";

export class GlobalDAOService<T> {
  // tslint:disable: ban-types
  pageName: string;

  constructor(pageName: string, protected api: ApiService) {
    this.pageName = pageName;
  }

  getAll(): Observable<T[]> {
    return this.api.postRequest<T[]>(`${this.pageName}/getAll/`, {});
  }

  getOne(newData: any): Observable<T> {
    return this.api.postRequest<T>(`${this.pageName}/getOne/`, newData);
  }

  create(data: T): Observable<T> {
    return this.api.postRequest<T>(`${this.pageName}/create`, data);
  }

  update(data: T): Observable<T> {
    return this.api.postRequest<T>(`${this.pageName}/update`, data);
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
