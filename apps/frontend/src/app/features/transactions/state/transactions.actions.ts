import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Transaction } from '@packages/types';

export const TransactionsActions = createActionGroup({
  source: 'Transactions',
  events: {
    'Load Transactions': emptyProps(),
    'Load Transactions Success': props<{ transactions: Transaction[] }>(),
    'Load Transactions Failure': props<{ error: string }>(),
  },
});
