import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Category, Transaction } from '@packages/types';
import { ChipComponent, type ChipVariant } from '@packages/ui';

export type TransactionListMode = 'full' | 'preview';

const CHIP_CLASSES: Record<Category, ChipVariant> = {
  Food: 'success',
  Transport: 'info',
  Entertainment: 'warning',
  Utilities: 'primary',
  Other: 'neutral',
};

@Component({
  selector: 'app-transaction-list-item',
  imports: [CurrencyPipe, ChipComponent],
  template: `
    <div class="flex items-center gap-3 py-3">
      <lib-chip
        [value]="transaction().category"
        [variant]="chipVariant()"
        size="sm"
      />
      <div class="min-w-0 flex-1">
        @if (transaction().description) {
          <p class="m-0 break-words text-sm text-(--color-text)">{{ transaction().description }}</p>
        }
        <p class="m-0 text-xs text-(--color-text-muted)">{{ transaction().date }}</p>
      </div>
      <span class="shrink-0 text-sm font-semibold text-(--color-text)">
        {{ transaction().amount | currency: 'USD' : 'symbol' : '1.2-2' }}
      </span>
      @if (mode() === 'full') {
        <button
          type="button"
          class="shrink-0 rounded p-1 text-(--color-text-muted) hover:bg-(--color-border) hover:text-(--color-text) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)"
          aria-label="Edit transaction"
          (click)="edit.emit(transaction())"
        >
          ✎
        </button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionListItemComponent {
  readonly transaction = input.required<Transaction>();
  readonly mode = input<TransactionListMode>('preview');
  readonly edit = output<Transaction>();
  readonly chipVariant = computed(() => CHIP_CLASSES[this.transaction().category]);
}
