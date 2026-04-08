import { createFeature, createReducer, on } from '@ngrx/store';
import { Balance } from '@packages/types';
import { BalanceActions } from './balance.actions';

export interface BalanceState {
  data: Balance | null;
  loading: boolean;
  error: string | null;
}

const initialState: BalanceState = {
  data: null,
  loading: false,
  error: null,
};

export const balanceFeature = createFeature({
  name: 'balance',
  reducer: createReducer(
    initialState,
    on(BalanceActions.loadBalance, (state) => ({ ...state, loading: true, error: null })),
    on(BalanceActions.loadBalanceSuccess, (state, { balance }) => ({
      ...state,
      loading: false,
      data: balance,
    })),
    on(BalanceActions.loadBalanceFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
  ),
});
