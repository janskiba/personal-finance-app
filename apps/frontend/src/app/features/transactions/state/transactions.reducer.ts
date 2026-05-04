import { createFeature, createReducer, on } from '@ngrx/store';
import { Transaction } from '@packages/types';
import { TransactionsActions } from './transactions.actions';

export interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: null,
};

export const transactionsFeature = createFeature({
  name: 'transactions',
  reducer: createReducer(
    initialState,
    on(TransactionsActions.loadTransactions, (state) => ({ ...state, loading: true, error: null })),
    on(TransactionsActions.loadTransactionsSuccess, (state, { transactions }) => ({
      ...state,
      loading: false,
      transactions,
    })),
    on(TransactionsActions.loadTransactionsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    on(TransactionsActions.addTransaction, (state, { transaction }) => ({
      ...state,
      transactions: [transaction, ...state.transactions],
    })),
    on(TransactionsActions.updateTransaction, (state, { transaction }) => ({
      ...state,
      transactions: state.transactions.map((t) => (t.id === transaction.id ? transaction : t)),
    })),
    on(TransactionsActions.deleteTransaction, (state, { id }) => ({
      ...state,
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
  ),
});
