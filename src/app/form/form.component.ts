import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, exhaustMap, filter, map, takeUntil, tap } from 'rxjs';
import { FakeApiService } from 'src/fake-api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {


  numbersPattern = /[^0-9]+/g;
  persianAlphabetPattern = /[^\u0600-\u06FF\uFB8A\u067E\u0686\u06AF]+/g;

  //@ts-ignore
  form: FormGroup;
  formSubmit = () => {
    console.log("Form Data:", this.form.getRawValue());

  };

  names = [
    'Mohamad Khalili',
    'Mohamad Khalili Torqabeh',
    'chapdast.dev',
    'Behsa Group',
    'john doe',
    'jane doe',

  ]
  //@ts-ignore
  filteredNames$: Subject<string[]> = new Subject();
  filteredSearchEngines$: Subject<{ id: number, title: string }[]> = new Subject();
  lastFetch: { id: number; title: string; }[] = [];

  constructor(private fakeServer: FakeApiService) { }
  private _unsubAll = new Subject
  ngOnDestroy(): void {
    this._unsubAll.next(null);
    this._unsubAll.complete();
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      numberOnly: new FormControl('', [Validators.required]),
      persianAlphabet: new FormControl('', [Validators.required]),
      syncAutoComplete: new FormControl('', [Validators.required]),
      asyncAutoComplete: new FormControl('', [Validators.required]),
    })
    this.subSyncAutoComp();
    this.form
      .get('asyncAutoComplete')?.valueChanges
      .pipe(
        takeUntil(this._unsubAll),
        filter(inp => inp.length > 3),
        map(inp => inp.toLowerCase()),
        exhaustMap(inp => this.fakeServer.fetchFakeData(inp)),
        tap(result => {
          this.lastFetch = result;
          this.filteredSearchEngines$.next(result);
        })
      ).subscribe();


  }
  subSyncAutoComp() {
    this.form
      .get('syncAutoComplete')?.valueChanges
      .pipe(
        takeUntil(this._unsubAll),
        filter(inp => inp.length > 3),
        map(inp => inp.toLowerCase()),
        tap(inp => {
          const filtered = this.names.filter(x => x.toLowerCase().includes(inp));
          this.filteredNames$.next(filtered);
        })
      ).subscribe();

  }

  setSyncAuto(item: string) {
    this.form.get('syncAutoComplete')?.patchValue(item)
    this.filteredNames$.next([]);
  }

  displayFn = (val: number) => {
    const item = this.lastFetch.find(x => x.id === val);
    return item ? item.title : "";
  };

  state(ctl: string): string {
    return this.form.get(ctl)?.valid ? 'ok' : 'error';
  }

}
