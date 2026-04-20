export type Transaction = {
  id: string;
  amount: number;
  date: string;
  category: Category;
  type: TransactionType;
  description?: string;
}

export type Category = 'Food' | 'Transport' | 'Entertainment' | 'Utilities' | 'Other';
export type TransactionType = 'income' | 'expense';
