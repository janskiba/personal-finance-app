import { computed, inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Balance } from '@packages/types';
import { selectTransactions } from '../transactions/state/transactions.selectors';
import { selectData, selectError, selectLoading } from './state/balance.selectors';
import { SessionService } from '../../session/session.service';

@Injectable({ providedIn: 'root' })
export class BalanceFacadeService {
  private readonly store = inject(Store);
  private readonly sessionService = inject(SessionService);

  private readonly apiBalance = this.store.selectSignal(selectData);
  private readonly apiLoading = this.store.selectSignal(selectLoading);
  private readonly apiError = this.store.selectSignal(selectError);
  private readonly transactions = this.store.selectSignal(selectTransactions);

  private readonly guestBalance = computed<Balance>(() => {
    const txs = this.transactions();
    const income = txs.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expenses = txs.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  });

  readonly balance = computed<Balance | null>(() =>
    this.sessionService.mode() === 'guest' ? this.guestBalance() : this.apiBalance(),
  );

  readonly isLoading = computed(() =>
    this.sessionService.mode() === 'guest' ? false : this.apiLoading(),
  );

  readonly error = computed<string | null>(() =>
    this.sessionService.mode() === 'guest' ? null : this.apiError(),
  );
}
