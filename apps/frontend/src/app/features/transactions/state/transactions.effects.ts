import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { SessionService } from '../../../session/session.service';
import { loadGuestTransactions } from '../guest-transactions.data';
import { TransactionsActions } from './transactions.actions';
import { TransactionsService } from '../transactions.service';

@Injectable()
export class TransactionsEffects {
  private readonly actions$ = inject(Actions);
  private readonly transactionsService = inject(TransactionsService);
  private readonly sessionService = inject(SessionService);

  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.loadTransactions),
      switchMap(() => {
        if (this.sessionService.mode() === 'guest') {
          return of(TransactionsActions.loadTransactionsSuccess({ transactions: loadGuestTransactions() }));
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
}

