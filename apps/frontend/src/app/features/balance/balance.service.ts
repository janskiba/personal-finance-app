import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Balance } from '@packages/types';

@Injectable({ providedIn: 'root' })
export class BalanceService {
  private readonly http = inject(HttpClient);

  getBalance(): Observable<Balance> {
    return this.http.get<Balance>('/api/balance');
  }
}
