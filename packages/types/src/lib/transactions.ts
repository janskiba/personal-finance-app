export type Transaction = {
  id: string;
  amount: number;
  date: string;
  category: Category;
  description?: string;
}

export type Category = 'Food' | 'Transport' | 'Entertainment' | 'Utilities' | 'Other';
