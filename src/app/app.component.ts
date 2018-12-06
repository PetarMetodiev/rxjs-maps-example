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

import { BackendService } from './backend.service';

const occurancesReducer = (acc, curr) => [...acc, curr];
const getLength = (arr: any[]) => arr.length;
const log = (label: string) => (what: string) => console.log(label, what);

const ms = 2000;

@Component({
  selector: 'maps-root',
  templateUrl: './app.component.html',
  styles: [`.button {
    width: 150px;
    height: 40px;
    color: white;
    background-color: rgba(91, 159,216);
    font-size: 20px;
    font-weight: 700;
  }`]
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

  constructor(private backendService: BackendService) { }

  ngAfterViewInit() {
    // const backend = (message) => of(message).pipe(
    //   delay(ms),
    //   tap(log('emit: '))
    // );

    const backend = (message) => this.backendService.getPosts().pipe(tap(() => console.log(message)));

    // autocomplete, search in a list with api call, shopping cart
    this.mergeMaps$ = fromEvent(this.mergeMapButton.nativeElement, 'click').pipe(
      mergeMap(() => backend('mergeMap')),
      scan(occurancesReducer, []),
      map(getLength)
    );

    // user changes their mind in the process for waiting a response
    this.switchMaps$ = fromEvent(this.switchMapButton.nativeElement, 'click').pipe(
      switchMap(() => backend('switchMap')),
      scan(occurancesReducer, []),
      map(getLength),
    );

    // useful for chat app?(que messages to be sent in order)
    this.concatMaps$ = fromEvent(this.concatMapButton.nativeElement, 'click').pipe(
      concatMap(() => backend('concatMap')),
      scan(occurancesReducer, []),
      map(getLength)
    );

    // useful for login screens
    this.exhaustMaps$ = fromEvent(this.exhaustMapButton.nativeElement, 'click').pipe(
      exhaustMap(() => backend('exhaustMap')),
      scan(occurancesReducer, []),
      map(getLength)
    );
  }
}
