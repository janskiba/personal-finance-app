import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BalanceComponent } from '../features/balance/components/balance.component';
import { BalanceStatComponent } from '../features/balance/components/balance-stat.component';
import { TransactionListComponent } from '../features/transactions/components/transaction-list.component';

@Component({
  selector: 'app-dashboard',
  imports: [BalanceComponent, BalanceStatComponent, TransactionListComponent],
  template: `
    <div class="grid gap-6">
      <section class="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.5fr_0.5fr]">
        <app-balance />
        <app-balance-stat type="income" />
        <app-balance-stat type="expenses" />
      </section>
      <app-transaction-list />
    </div>
  `,
  host: {
    class: 'block',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent  {
}

