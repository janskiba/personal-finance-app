import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { LucidePlus } from '@lucide/angular';
import { Store } from '@ngrx/store';
import { ButtonComponent, CardComponent, DialogComponent } from '@packages/ui';
import { Transaction } from '@packages/types';
import { TransactionComponent, TransactionDraft } from '../../transactions/components/transaction.component';
import { BalanceActions } from '../state/balance.actions';
import { BalanceFacadeService } from '../balance-facade.service';
import { TransactionsActions } from '../../transactions/state/transactions.actions';

@Component({
  selector: 'app-balance',
  imports: [CardComponent, ButtonComponent, DialogComponent, TransactionComponent, CurrencyPipe],
  template: `<lib-card aria-live="polite">
    <p
      class="m-0 flex items-center gap-2 text-[1rem] leading-tight font-medium text-(--color-text-muted) sm:text-[1.5rem]"
    >
      <span class="-translate-y-[0.05em] text-[1rem] leading-none text-(--color-text-muted)" aria-hidden="true"
        >✧</span
      >
      <span>Current Peace of Mind</span>
    </p>

    @if (isLoading() && !balance()) {
      <p
        class="mt-4 flex text-[clamp(1rem,8vw,2.5rem)] leading-[0.95] font-bold tracking-[-0.04em] text-(--color-text)"
      >
        <span>$0</span>
        <span class="ml-[0.05em] text-[0.95em] text-(--color-primary)">.00</span>
      </p>
    }
    @else if (error()) {
      <p class="mt-4 text-[0.95rem] text-[#b42318]">{{ error() }}</p>
    }
    @else {
      <p
        class="mt-4 flex text-[clamp(1rem,8vw,2.5rem)] leading-[0.95] font-bold tracking-[-0.04em] text-(--color-text)"
      >
        <span>{{ balance()?.balance | currency: 'USD' : 'symbol' : '1.2-2' }}</span>
      </p>
    }

    <div class="mt-6">
      <lib-button size="lg" [icon]="plusIcon" ariaLabel="Create new transaction" (click)="openDialog()">
        New transaction
      </lib-button>
    </div>
  </lib-card>

  @if (isDialogOpen()) {
    <lib-dialog (closeDialog)="closeDialog()" width="md">
      <span dialog-title>New transaction</span>

      <div dialog-content>
        <app-transaction #newTransactionForm (createTransaction)="addTransaction($event)" />
      </div>

      <div dialog-actions>
        <lib-button type="button" variant="ghost" (click)="closeDialog()">Cancel</lib-button>
        <lib-button type="button" (click)="newTransactionForm.submit()" [disabled]="!newTransactionForm.isFormValid()">Add transaction</lib-button>
      </div>
    </lib-dialog>
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly balanceFacade = inject(BalanceFacadeService);
  protected readonly plusIcon = LucidePlus;
  protected readonly isDialogOpen = signal(false);

  readonly balance = this.balanceFacade.balance;
  readonly isLoading = this.balanceFacade.isLoading;
  readonly error = this.balanceFacade.error;

  ngOnInit(): void {
    this.store.dispatch(BalanceActions.loadBalance());
  }

  protected openDialog(): void {
    this.isDialogOpen.set(true);
  }

  protected closeDialog(): void {
    this.isDialogOpen.set(false);
  }

  protected addTransaction(draft: TransactionDraft): void {
    const transaction: Transaction = {
      ...draft,
      id: crypto.randomUUID(),
    };

    this.store.dispatch(TransactionsActions.addTransaction({ transaction }));
    this.closeDialog();
  }
}
