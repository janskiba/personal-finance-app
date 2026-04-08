export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  category: Category;
  description?: string;
}

export type Category = 'Food' | 'Transport' | 'Entertainment' | 'Utilities' | 'Other';
