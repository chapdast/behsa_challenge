import { Injectable } from '@angular/core';
import { Observable, filter, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeApiService {
  constructor() { }


  fetchFakeData = (searchTerm: string): Observable<{ id: number, title: string }[]> => {
    return of([
      { id: 1, title: 'Google.com' },
      { id: 2, title: 'Bing.com' },
      { id: 3, title: 'Yahoo.com' },
      { id: 4, title: 'Yandex.com' },
    ]).pipe(
      filter(x => x.filter(x => x.title.toLowerCase().includes(searchTerm)).length > 0)
    )
  }
}
