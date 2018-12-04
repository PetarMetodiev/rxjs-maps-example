import {
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef
} from '@angular/core';

import {
  fromEvent,
  of,
  Observable
} from 'rxjs';

import {
  mergeMap,
  switchMap,
  exhaustMap,
  concatMap,
  delay,
  scan,
  tap,
  map
} from 'rxjs/operators';

const occurancesReducer = (acc, curr) => [...acc, curr];
const getLength = (arr: any[]) => arr.length;
const log = (label: string) => (what: string) => console.log(label, what);

const ms = 2000;

@Component({
  selector: 'maps-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements AfterViewInit {

  mergeMaps$: Observable<number>;
  switchMaps$: Observable<number>;
  concatMaps$: Observable<number>;
  exhaustMaps$: Observable<number>;

  @ViewChild('mergeMapButton') mergeMapButton: ElementRef<HTMLButtonElement>;
  @ViewChild('switchMapButton') switchMapButton: ElementRef<HTMLButtonElement>;
  @ViewChild('concatMapButton') concatMapButton: ElementRef<HTMLButtonElement>;
  @ViewChild('exhaustMapButton') exhaustMapButton: ElementRef<HTMLButtonElement>;

  ngAfterViewInit() {
    const fakeBackend = (message) => of(message).pipe(
      delay(ms),
      tap(log('emit: '))
    );

    this.mergeMaps$ = fromEvent(this.mergeMapButton.nativeElement, 'click').pipe(
      mergeMap(() => fakeBackend('mergeMap')),
      scan(occurancesReducer, []),
      map(getLength)
    );

    this.switchMaps$ = fromEvent(this.switchMapButton.nativeElement, 'click').pipe(
      switchMap(() => fakeBackend('switchMap')),
      scan(occurancesReducer, []),
      map(getLength)
    );

    this.concatMaps$ = fromEvent(this.concatMapButton.nativeElement, 'click').pipe(
      concatMap(() => fakeBackend('concatMap')),
      scan(occurancesReducer, []),
      map(getLength)
    );

    this.exhaustMaps$ = fromEvent(this.exhaustMapButton.nativeElement, 'click').pipe(
      exhaustMap(() => fakeBackend('exhaustMap')),
      scan(occurancesReducer, []),
      map(getLength)
    );
  }
}
