import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Position } from "../models/position";

@Injectable({
  providedIn: "root"
})
export class PositionService {

  constructor(private http: HttpClient,
    @Inject("baseUrl") private baseUrl: string,) { }


  getAllPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.baseUrl}/Position/getAllPositions`)
  }

  addPosition(addPostionRequest: Position): Observable<Position> {
    return this.http.post<Position>(`${this.baseUrl}/Position/creatPosiiton`, addPostionRequest);
  }

  editPosition(editPositionRequest: Position): Observable<Position> {
    return this.http.patch<Position>(`${this.baseUrl}/Position/updatePosition/positionId`, editPositionRequest)
  }

  getPosition(positionId: number): Observable<Position> {
    return this.http.get<Position>(`${this.baseUrl}/Position/getPosition/positionId?positionId=${positionId}`)
  }

  deletePosition(positionId: number) {
    return this.http.delete(`${this.baseUrl}/Position/deletePosition/positionId?positionId=${positionId}`)
  }
}
