import { Injectable } from '@angular/core';
import { Observable, delay, interval, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DummyHttpClientService {
  constructor() {}

  post(values: any): Observable<any> {
    return of(values).pipe(delay(Math.random() * 4000));
  }
}
