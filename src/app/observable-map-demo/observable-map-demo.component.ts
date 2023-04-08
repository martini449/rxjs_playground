import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Subject,
  concatMap,
  exhaustMap,
  merge,
  mergeMap,
  switchMap,
} from 'rxjs';
import { DummyHttpClientService } from '../dummy-http-client.service';
import { SwapiServiceService } from '../swapi-service.service';

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
  loading: boolean = false;
  clickEvent: Subject<any> = new Subject();
  searchInput = new FormControl('');
  concatMapFormDraft = new FormGroup({
    input1: new FormControl(''),
    input2: new FormControl(''),
    input3: new FormControl(''),
  });

  constructor(
    private dummyHttpClient: DummyHttpClientService,
    private snackBar: MatSnackBar,
    private swapiService: SwapiServiceService
  ) {}

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
    ).subscribe((event) => {
      return this.events.push(event);
    });

    this.clickEvent
      .pipe(
        exhaustMap((values) => {
          this.loading = true;
          this.snackBar.open('Click NOT ignored!', 'Close', {
            duration: 500,
          });
          return this.dummyHttpClient.post(values);
        })
      )
      .subscribe(() => (this.loading = false));

    this.searchInput.valueChanges
      .pipe(switchMap((phrase) => this.swapiService.search(phrase)))
      .subscribe();

    this.concatMapFormDraft.valueChanges
      .pipe(concatMap((values) => this.dummyHttpClient.post(values)))
      .subscribe((draft) => console.log(`draft saved for:`, draft));
  }

  showcaseExhaust() {
    this.clickEvent.next({ exhaustClick: 'clicked' });
  }
}
