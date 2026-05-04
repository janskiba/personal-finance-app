import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { LucideDynamicIcon, LucidePencil, LucideTrash } from '@lucide/angular';
import { Transaction } from '@packages/types';
import { ChipComponent, CHIP_CLASSES } from '@packages/ui';

export type TransactionListMode = 'full' | 'preview';

@Component({
  selector: 'app-transaction-list-item',
  imports: [CurrencyPipe, ChipComponent, LucideDynamicIcon],
  template: `
    <div class="flex items-center gap-3 py-3">
      <lib-chip [value]="transaction().category" [variant]="chipVariant()" size="sm" />
      <div class="min-w-0 flex-1">
        @if (transaction().description) {
          <p class="m-0 break-words text-sm text-(--color-text)">{{ transaction().description }}</p>
        }
        <p class="m-0 text-xs text-(--color-text-muted)">{{ transaction().date }}</p>
      </div>
      <span class="shrink-0 text-sm font-semibold text-(--color-text)">
        {{ amountPrefix() }} {{ transaction().amount | currency: 'USD' : 'symbol' : '1.2-2' }}
      </span>
      @if (mode() === 'full') {
        <button
          type="button"
          class="rounded p-1 text-(--color-text-muted) hover:bg-(--color-bg) hover:text-(--color-text)"
          aria-label="Edit transaction"
          (click)="edit.emit(transaction())"
        >
          <svg [lucideIcon]="editIcon" class="w-4 h-4"></svg>
        </button>
        <button
          type="button"
          class="rounded p-1 text-(--color-text-muted) hover:bg-(--color-bg) hover:text-(--color-text)"
          aria-label="Delete transaction"
          (click)="delete.emit(transaction())"
        >
          <svg [lucideIcon]="trashIcon" class="w-4 h-4"></svg>
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
  readonly delete = output<Transaction>();
  readonly chipVariant = computed(() => CHIP_CLASSES[this.transaction().category]);
  readonly amountPrefix = computed(() => (this.transaction().type === 'expense' ? '-' : '+'));
  protected readonly trashIcon = LucideTrash;
  protected readonly editIcon = LucidePencil;
}
