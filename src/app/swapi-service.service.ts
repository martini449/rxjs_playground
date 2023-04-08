import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwapiServiceService {
  search(event: any): Observable<any> {
    return this.httpClient
      .get<{ results: string }>(`https://swapi.dev/api/people/?search=${event}`)
      .pipe(map((data) => data.results));
  }

  constructor(private httpClient: HttpClient) {}
}
