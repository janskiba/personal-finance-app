import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Balance } from '@packages/types';

export const BalanceActions = createActionGroup({
  source: 'Balance',
  events: {
    'Load Balance': emptyProps(),
    'Load Balance Success': props<{ balance: Balance }>(),
    'Load Balance Failure': props<{ error: string }>(),
  },
});
