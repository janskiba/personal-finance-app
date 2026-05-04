import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { SessionService } from '../../../core/session.service';
import { loadGuestTransactions } from '../guest-transactions.data';
import { TransactionsActions } from './transactions.actions';
import { TransactionsService } from '../transactions.service';
import { selectTransactions } from './transactions.selectors';

@Injectable()
export class TransactionsEffects {
  private readonly actions$ = inject(Actions);
  private readonly transactionsService = inject(TransactionsService);
  private readonly sessionService = inject(SessionService);
  private readonly store = inject(Store);

  private readonly STORAGE_KEY = 'guest_transactions';

  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.loadTransactions),
      switchMap(() => {
        if (this.sessionService.mode() === 'guest') {
          return of(
            TransactionsActions.loadTransactionsSuccess({ transactions: loadGuestTransactions() }),
          );
        }
        return this.transactionsService.getTransactions().pipe(
          map((transactions) => TransactionsActions.loadTransactionsSuccess({ transactions })),
          catchError((error: unknown) =>
            of(TransactionsActions.loadTransactionsFailure({ error: String(error) })),
          ),
        );
      }),
    ),
  );

  deleteTransaction$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TransactionsActions.deleteTransaction),
        switchMap(({ id }) => {
          if (this.sessionService.mode() === 'guest') {
            return of(void 0);
          }
          return this.transactionsService.deleteTransaction(id).pipe(catchError(() => of(void 0)));
        }),
      ),
    { dispatch: false },
  );

  saveTransactionsToStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          TransactionsActions.loadTransactionsSuccess,
          TransactionsActions.addTransaction,
          TransactionsActions.updateTransaction,
          TransactionsActions.deleteTransaction,
        ),
        withLatestFrom(this.store.select(selectTransactions)),
        tap(([, transactions]) => {
          if (this.sessionService.mode() === 'guest') {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(transactions));
          }
        }),
      ),
    { dispatch: false },
  );
}
