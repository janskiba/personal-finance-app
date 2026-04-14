import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Balance } from '@packages/types';

@Injectable({ providedIn: 'root' })
export class BalanceService {
  private readonly http = inject(HttpClient);

  // To implement
  getBalance(): Observable<Balance> {
    return of({  income: 18750.8,
  expenses: 6300,
  balance: 12450.8})
    // return this.http.get<Balance>('/api/balance');
  }
}
