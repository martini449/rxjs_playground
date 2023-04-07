import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, concatMap, exhaustMap, merge, mergeMap, switchMap } from 'rxjs';
import { DummyHttpClientService } from '../dummy-http-client.service';

@Component({
  selector: 'app-observable-map-demo',
  templateUrl: './observable-map-demo.component.html',
  styleUrls: ['./observable-map-demo.component.scss'],
})
export class ObservableMapDemoComponent implements OnInit {
  mergeMapForm = new FormGroup({
    mergeMap: new FormControl(''),
  });
  concatMapForm = new FormGroup({
    concatMap: new FormControl(''),
  });
  switchMapForm = new FormGroup({
    switchMap: new FormControl(''),
  });
  exhaustMapForm = new FormGroup({
    exhaustMap: new FormControl(''),
  });
  events: string[] = [];
  constructor(private dummyHttpClient: DummyHttpClientService) {}

  ngOnInit(): void {
    merge(
      this.mergeMapForm.valueChanges.pipe(
        mergeMap((values) => this.dummyHttpClient.post(values))
      ),
      this.concatMapForm.valueChanges.pipe(
        concatMap((values) => this.dummyHttpClient.post(values))
      ),
      this.switchMapForm.valueChanges.pipe(
        switchMap((values) => this.dummyHttpClient.post(values))
      ),
      this.exhaustMapForm.valueChanges.pipe(
        exhaustMap((values) => this.dummyHttpClient.post(values))
      )
    ).subscribe(event => this.events.push(event))
  }
}
