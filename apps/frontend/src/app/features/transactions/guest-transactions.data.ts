import { Transaction } from '@packages/types';

export const GUEST_SEED_TRANSACTIONS: Transaction[] = [
  { id: 'guest-1', amount: 52.4, category: 'Food', type: 'expense', date: '2026-04-16', description: 'Grocery run' },
  { id: 'guest-2', amount: 9.9, category: 'Transport', type: 'expense', date: '2026-04-15', description: 'Bus pass top-up' },
  { id: 'guest-3', amount: 14.99, category: 'Entertainment', type: 'expense', date: '2026-04-14', description: 'Streaming subscription' },
  { id: 'guest-4', amount: 78.0, category: 'Utilities', type: 'expense', date: '2026-04-13', description: 'Electric bill' },
  { id: 'guest-5', amount: 23.5, category: 'Food', type: 'expense', date: '2026-04-12', description: 'Lunch with team' },
  { id: 'guest-6', amount: 120.0, category: 'Other', type: 'expense', date: '2026-04-10', description: 'Birthday gift' },
  { id: 'guest-7', amount: 34.6, category: 'Food', type: 'expense', date: '2026-04-08', description: 'Dinner takeout' },
  { id: 'guest-8', amount: 250.0, category: 'Utilities', type: 'expense', date: '2026-04-07', description: 'Internet & phone bill' },
  { id: 'guest-9', amount: 18.0, category: 'Transport', type: 'expense', date: '2026-04-05', description: 'Taxi to airport' },
  { id: 'guest-10', amount: 45.99, category: 'Entertainment', type: 'expense', date: '2026-04-03', description: 'Concert ticket' },
  { id: 'guest-11', amount: 67.3, category: 'Food', type: 'expense', date: '2026-04-01', description: 'Weekly groceries' },
];

const GUEST_STORAGE_KEY = 'guest_transactions';

export function loadGuestTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem(GUEST_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) return parsed as Transaction[];
    }
  } catch {
    // ignore corrupt storage
  }
  return GUEST_SEED_TRANSACTIONS;
}

export function saveGuestTransactions(transactions: Transaction[]): void {
  try {
    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(transactions));
  } catch {
    // ignore storage errors
  }
}
