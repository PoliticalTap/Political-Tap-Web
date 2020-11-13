import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private url = "https://political-tap.herokuapp.com/testCandidate";

  constructor(private httpClient: HttpClient) { }

  getCandidatesByZip(zip: string): Observable<any> {
    let params = new HttpParams().set('zip', zip);

    return this.httpClient.get(this.url, { params });
  }
}
