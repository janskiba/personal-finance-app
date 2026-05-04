import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';

import { Category, Transaction, TransactionType } from '@packages/types';
import { ChipComponent, CHIP_CLASSES, ChipVariant } from '@packages/ui';

export type TransactionDraft = Pick<
  Transaction,
  'amount' | 'category' | 'description' | 'date' | 'type'
>;

const CATEGORIES: Category[] = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Other'];
const TRANSACTION_TYPES: TransactionType[] = ['income', 'expense'];

type NewTransactionFormValue = Omit<Transaction, 'id'>;

@Component({
  selector: 'app-transaction',
  imports: [ChipComponent],
  template: `<form (ngSubmit)="submit()" class="grid gap-4">
    <div class="grid gap-2">
      <span class="text-sm font-medium text-(--color-text)">Type</span>
      <div class="flex gap-2">
        @for (type of transactionTypes; track type) {
          <lib-chip
            [value]="type"
            [variant]="type === 'income' ? 'success' : 'danger'"
            [selectable]="true"
            [selected]="formValue().type === type"
            (clicked)="onTypeChange($event)"
          />
        }
      </div>
    </div>

    <div class="grid gap-2">
      <label for="transaction-amount" class="text-sm font-medium text-(--color-text)"
        >Amount (max {{ MAX_AMOUNT }})</label
      >
      <input
        id="transaction-amount"
        type="text"
        inputmode="decimal"
        [value]="amountInput()"
        (input)="onAmountInput($event)"
        class="h-10 rounded-lg border border-(--color-border) bg-(--color-surface) px-3 text-sm text-(--color-text)
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)"
      />
    </div>

    <div class="grid gap-2">
      <span class="text-sm font-medium text-(--color-text)">Category</span>
      <div class="flex flex-wrap gap-2">
        @for (category of categories; track category) {
          <lib-chip
            [value]="category"
            [variant]="getCategoryVariant(category)"
            [selectable]="true"
            [selected]="formValue().category === category"
            (clicked)="onCategoryChange($event)"
          />
        }
      </div>
    </div>

    <div class="grid gap-2">
      <label for="transaction-date" class="text-sm font-medium text-(--color-text)">Date</label>
      <input
        id="transaction-date"
        type="date"
        [value]="formValue().date"
        (input)="onDateInput($event)"
        class="h-10 rounded-lg border border-(--color-border) bg-(--color-surface) px-3 text-sm text-(--color-text)
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)"
      />
    </div>

    <div class="grid gap-2">
      <label for="transaction-description" class="text-sm font-medium text-(--color-text)"
        >Description</label
      >
      <textarea
        id="transaction-description"
        rows="3"
        maxlength="200"
        [value]="formValue().description ?? ''"
        (input)="onDescriptionInput($event)"
        class="rounded-lg border border-(--color-border) bg-(--color-surface) px-3 py-2 text-sm text-(--color-text)
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)"
      ></textarea>
    </div>
  </form>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionComponent {
  readonly createTransaction = output<TransactionDraft>();
  readonly initialValue = input<TransactionDraft | null>(null);
  readonly categories = CATEGORIES;
  readonly transactionTypes = TRANSACTION_TYPES;
  readonly amountInput = signal('');
  readonly MAX_AMOUNT = 9999999;

  readonly formValue = signal<NewTransactionFormValue>({
    amount: 0,
    category: 'Other',
    type: 'expense',
    date: this.getTodayDateInputValue(),
    description: '',
  });

  constructor() {
    effect(() => {
      const initial = this.initialValue();
      if (!initial) return;
      const amountStr = initial.amount > 0 ? initial.amount.toFixed(2).replace('.', ',') : '';
      this.amountInput.set(amountStr);
      this.formValue.set({
        amount: initial.amount,
        category: initial.category,
        type: initial.type,
        date: initial.date,
        description: initial.description ?? '',
      });
    });
  }

  readonly isFormValid = computed(() => {
    const value = this.formValue();
    return (
      Number.isFinite(value.amount) &&
      value.amount >= 0.01 &&
      CATEGORIES.includes(value.category) &&
      TRANSACTION_TYPES.includes(value.type) &&
      value.date.trim().length > 0 &&
      (value.description?.length ?? 0) <= 200
    );
  });

  submit(): void {
    if (!this.isFormValid()) {
      return;
    }

    const value = this.formValue();
    this.createTransaction.emit({
      amount: value.amount,
      category: value.category,
      type: value.type,
      description: value.description || undefined,
      date: value.date,
    });
  }

  protected onAmountInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const formatted = this.formatAmountInput(input.value);

    // Always write back to DOM to enforce sanitized value
    input.value = formatted;
    this.amountInput.set(formatted);

    const numeric = parseFloat(formatted.replace(',', '.'));
    const amount = Number.isFinite(numeric) ? numeric : 0;

    this.formValue.update((curr) => ({ ...curr, amount }));
  }

  private formatAmountInput(raw: string): string {
    // 1. Normalize: dots → commas, strip anything that's not a digit or comma
    const normalized = raw.replace(/\./g, ',').replace(/[^\d,]/g, '');

    // 2. Split on FIRST comma only — ignore all subsequent ones
    const commaIndex = normalized.indexOf(',');
    const rawInteger = commaIndex === -1 ? normalized : normalized.slice(0, commaIndex);
    const rawFraction = commaIndex === -1 ? '' : normalized.slice(commaIndex + 1).replace(/,/g, '');

    // 3. Clamp integer part: strip leading zeros, max 7 digits (9 999 999)
    const clampedInteger = rawInteger
      .replace(/^0+(\d)/, '$1') // strip leading zeros: "007" → "7"
      .slice(0, 7); // max 7 digits

    // 4. Enforce MAX_AMOUNT = 9_999_999
    const integerNum = parseInt(clampedInteger || '0', 10);
    const finalInteger = integerNum > this.MAX_AMOUNT ? String(this.MAX_AMOUNT) : clampedInteger;

    // 5. Fraction: max 2 digits
    const finalFraction = rawFraction.slice(0, 2);

    // 6. Rebuild: only include comma if user typed it
    if (commaIndex === -1) return finalInteger;
    return `${finalInteger || '0'},${finalFraction}`;
  }

  protected onCategoryChange(value: string): void {
    if (!this.isCategory(value)) {
      return;
    }

    this.formValue.update((current) => ({
      ...current,
      category: value,
    }));
  }

  protected onTypeChange(value: string): void {
    if (!this.isTransactionType(value)) {
      return;
    }

    this.formValue.update((current) => ({
      ...current,
      type: value,
    }));
  }

  protected onDateInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.formValue.update((current) => ({
      ...current,
      date: value,
    }));
  }

  protected onDescriptionInput(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.formValue.update((current) => ({
      ...current,
      description: value,
    }));
  }

  private isCategory(value: string): value is Category {
    return CATEGORIES.includes(value as Category);
  }

  private isTransactionType(value: string): value is TransactionType {
    return TRANSACTION_TYPES.includes(value as TransactionType);
  }

  protected getCategoryVariant(category: Category): ChipVariant {
    return CHIP_CLASSES[category];
  }

  private getTodayDateInputValue(): string {
    return new Date().toISOString().slice(0, 10);
  }
}
