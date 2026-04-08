import { transactionsFeature } from './transactions.reducer';

export const { selectTransactionsState, selectTransactions, selectLoading, selectError } =
  transactionsFeature;
