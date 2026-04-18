import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Transaction } from '@packages/types';
import { ButtonComponent, CardComponent, DialogComponent } from '@packages/ui';
import { selectTransactions } from '../state/transactions.selectors';
import { TransactionsActions } from '../state/transactions.actions';
import { TransactionComponent, TransactionDraft } from './transaction.component';
import { TransactionListItemComponent, TransactionListMode } from './transaction-list-item.component';

@Component({
  selector: 'app-transaction-list',
  imports: [CardComponent, DialogComponent, ButtonComponent, TransactionListItemComponent, TransactionComponent],
  template: `
    <lib-card>
      <p class="m-0 text-[0.7rem] font-semibold uppercase tracking-widest text-(--color-text-muted)">Transactions</p>

      @if (!transactions().length) {
        <p class="mt-4 text-sm text-(--color-text-muted)">No transactions yet.</p>
      } @else {
        <ul class="mt-2 divide-y divide-(--color-border)" role="list" aria-label="Transaction list">
          @for (transaction of transactions(); track transaction.id) {
            <li>
              <app-transaction-list-item
                [transaction]="transaction"
                [mode]="mode()"
                (edit)="startEdit($event)"
              />
            </li>
          }
        </ul>
      }
    </lib-card>

    @if (editingTransaction()) {
      <lib-dialog (closeDialog)="cancelEdit()" width="md">
        <span dialog-title>Edit transaction</span>
        <div dialog-content>
          <app-transaction
            #editForm
            [initialValue]="editingTransactionDraft()"
            (createTransaction)="saveEdit($event)"
          />
        </div>
        <div dialog-actions>
          <lib-button type="button" variant="ghost" (click)="cancelEdit()">Cancel</lib-button>
          <lib-button type="button" (click)="editForm.submit()" [disabled]="!editForm.isFormValid()">Save</lib-button>
        </div>
      </lib-dialog>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionListComponent implements OnInit {
  readonly mode = input<TransactionListMode>('full');

  private readonly store = inject(Store);

  ngOnInit() {
    this.store.dispatch(TransactionsActions.loadTransactions());
  }

  readonly transactions = this.store.selectSignal(selectTransactions);

  readonly editingTransaction = signal<Transaction | null>(null);
  readonly editingTransactionDraft = computed(() => {
    const t = this.editingTransaction();
    if (!t) return null;
    return { amount: t.amount, category: t.category, date: t.date, description: t.description };
  });

  protected startEdit(transaction: Transaction): void {
    this.editingTransaction.set(transaction);
  }

  protected cancelEdit(): void {
    this.editingTransaction.set(null);
  }

  protected saveEdit(draft: TransactionDraft): void {
    const editing = this.editingTransaction();
    if (!editing) return;
    this.store.dispatch(TransactionsActions.updateTransaction({ transaction: { ...draft, id: editing.id } }));
    this.editingTransaction.set(null);
  }
}
