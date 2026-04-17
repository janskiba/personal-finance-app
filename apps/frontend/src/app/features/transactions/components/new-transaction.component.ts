import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { Category, Transaction } from '@packages/types';

export type NewTransactionDraft = Pick<Transaction, 'amount' | 'category' | 'description' | 'date'>;

const CATEGORIES: Category[] = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Other'];

type NewTransactionFormValue = Omit<Transaction, 'id'>;

@Component({
  selector: 'app-new-transaction',
  template: `<form (ngSubmit)="submit()" class="grid gap-4">
    <div class="grid gap-2">
      <label for="transaction-amount" class="text-sm font-medium text-(--color-text)">Amount</label>
      <input
        id="transaction-amount"
        type="text"
        inputmode="decimal"
        maxlength="10"
        [value]="amountInput()"
        (input)="onAmountInput($event)"
        class="h-10 rounded-lg border border-(--color-border) bg-(--color-surface) px-3 text-sm text-(--color-text)
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)"
      />
    </div>

    <div class="grid gap-2">
      <label for="transaction-category" class="text-sm font-medium text-(--color-text)">Category</label>
      <select
        id="transaction-category"
        [value]="formValue().category"
        (change)="onCategoryChange($event)"
        class="h-10 rounded-lg border border-(--color-border) bg-(--color-surface) px-3 text-sm text-(--color-text)
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)"
      >
        @for (category of categories; track category) {
          <option [value]="category">{{ category }}</option>
        }
      </select>
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
      <label for="transaction-description" class="text-sm font-medium text-(--color-text)">Description</label>
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
export class NewTransactionComponent {
  readonly createTransaction = output<NewTransactionDraft>();
  readonly categories = CATEGORIES;
  readonly amountInput = signal('0');

  readonly formValue = signal<NewTransactionFormValue>({
    amount: 0,
    category: 'Other',
    date: this.getTodayDateInputValue(),
    description: '',
  });

  private readonly isFormValid = computed(() => {
    const value = this.formValue();
    return (
      Number.isFinite(value.amount) &&
      value.amount >= 0.01 &&
      CATEGORIES.includes(value.category) &&
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
      description: value.description || undefined,
      date: value.date,
    });
  }

  protected onAmountInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const formattedValue = this.formatAmountInput(input.value);
    input.value = formattedValue;
    this.amountInput.set(formattedValue);

    const value = Number(formattedValue.replace(',', '.'));
    const normalizedValue = Number.isFinite(value) ? Math.max(0, value) : 0;

    this.formValue.update((current) => ({
      ...current,
      amount: normalizedValue,
    }));
  }

  private formatAmountInput(rawValue: string): string {
    const normalizedRawValue = rawValue.replace(/\./g, ',').replace(/[^\d,]/g, '');
    const separatorIndex = normalizedRawValue.indexOf(',');

    const integerPart =
      separatorIndex === -1
        ? normalizedRawValue
        : normalizedRawValue.slice(0, separatorIndex);
    const fractionalSource =
      separatorIndex === -1
        ? ''
        : normalizedRawValue.slice(separatorIndex + 1).replace(/,/g, '');
    const fractionalPart = fractionalSource.slice(0, 2);

    if (separatorIndex === -1) {
      return integerPart;
    }

    return `${integerPart || '0'},${fractionalPart}`;
  }

  protected onCategoryChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (!this.isCategory(value)) {
      return;
    }

    this.formValue.update((current) => ({
      ...current,
      category: value,
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

  private getTodayDateInputValue(): string {
    return new Date().toISOString().slice(0, 10);
  }
}
