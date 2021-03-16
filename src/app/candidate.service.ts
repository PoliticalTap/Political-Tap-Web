import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private url = "https://political-tap.herokuapp.com";
  // private url = "http://localhost:5000";

  constructor(private httpClient: HttpClient) { }

  getCandidatesByZip(zip: string): Observable<any> {
    let params = new HttpParams().set('zip', zip);

    return this.httpClient.get(this.url + '/getCandidateList', { params });
  }

  getCandidateProfile(candidateId: string): Observable<any> {
    let params = new HttpParams().set('candidate_id', candidateId);

    return this.httpClient.get(this.url + "/getCandidate", { params });
  }

  getCandidateTweets(candidateId: string): Observable<any> {
    let params = new HttpParams().set('candidate_id', candidateId);

    return this.httpClient.get(this.url + "/getCandidateTweets", { params });
  }

  getUserZipFromCoords(latitude: string, longitude: string): Observable<any> {
    let params = new HttpParams()
                      .set('latitude', latitude)
                      .set('longitude', longitude);
    
    return this.httpClient.get(this.url + '/getZipFromLocation', { params });
  }

  getFeedView(zip: string): Observable<any> {
    let params = new HttpParams().set('zip', zip);
    
    return this.httpClient.get(this.url + '/getFeedFromLocation', { params });
  }

  getCandidateVoteHistory(candidateId: string): Observable<any> {
    let params = new HttpParams().set('candidate_id', candidateId);
    
    return this.httpClient.get(this.url + '/getCandidateVoteHistory', { params });
  }

  getOfficialsList(zip: string): Observable<any> {
    let params = new HttpParams().set('zip', zip);

    return this.httpClient.get(this.url + '/getOfficialsList', { params });
  }
}
