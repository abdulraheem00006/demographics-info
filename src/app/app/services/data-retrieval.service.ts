import { Injectable } from "@angular/core";
import { data } from "../data/data";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class DataRetrievalService {
  constructor() {}
  public retrieveGeoJSON(): Observable<any> {
    return of(data);
  }
}
