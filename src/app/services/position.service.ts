import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http:HttpClient,
    @Inject('baseUrl') private baseUrl: string,) { }

    getAllPostions()
  {
    return this.http.get(`${this.baseUrl}/Position/getAllPositions`)
  }
}
