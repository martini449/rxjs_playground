import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { concatMap, exhaustMap, mergeMap, switchMap } from 'rxjs';
import { DummyHttpClientService } from '../dummy-http-client.service';

@Component({
  selector: 'app-observable-map-demo',
  templateUrl: './observable-map-demo.component.html',
  styleUrls: ['./observable-map-demo.component.scss'],
})
export class ObservableMapDemoComponent implements OnInit {
  mergeMapForm = new FormGroup({
    input1: new FormControl(''),
  });
  concatMapForm = new FormGroup({
    input2: new FormControl(''),
  });
  switchMapForm = new FormGroup({
    input3: new FormControl(''),
  });
  exhaustMapForm = new FormGroup({
    input4: new FormControl(''),
  });

  constructor(private dummyHttpClient: DummyHttpClientService) {}

  ngOnInit(): void {
    this.mergeMapForm.valueChanges
      .pipe(mergeMap((values) => this.dummyHttpClient.post(values)))
      .subscribe((values) => console.warn(`mergeMap`, values));

    this.concatMapForm.valueChanges
      .pipe(concatMap((values) => this.dummyHttpClient.post(values)))
      .subscribe((values) => console.warn(`concatMap`, values));

    this.switchMapForm.valueChanges
      .pipe(switchMap((values) => this.dummyHttpClient.post(values)))
      .subscribe((values) => console.warn(`switchMap`, values));

    this.exhaustMapForm.valueChanges
      .pipe(exhaustMap((values) => this.dummyHttpClient.post(values)))
      .subscribe((values) => console.warn(`exhaustMap`, values));
  }
}
