import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { BalanceActions } from './balance.actions';
import { BalanceService } from '../balance.service';

@Injectable()
export class BalanceEffects {
  private readonly actions$ = inject(Actions);
  private readonly balanceService = inject(BalanceService);

  loadBalance$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BalanceActions.loadBalance),
      switchMap(() =>
        this.balanceService.getBalance().pipe(
          map((balance) => BalanceActions.loadBalanceSuccess({ balance })),
          catchError((error: unknown) =>
            of(BalanceActions.loadBalanceFailure({ error: String(error) })),
          ),
        ),
      ),
    ),
  );
}
