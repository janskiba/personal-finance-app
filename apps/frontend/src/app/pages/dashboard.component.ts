import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BalanceComponent } from '../features/balance/components/balance.component';
import { BalanceStatComponent } from "../features/balance/components/balance-stat.component";

@Component({
  selector: 'app-dashboard',
  imports: [BalanceComponent, BalanceStatComponent],
  template: `<section class="dashboard-layout">
    <app-balance />
    <app-balance-stat type="income" />
    <app-balance-stat type="expenses" />
  </section>`,
  styles: `
    :host {
      display: block;
    }

    .dashboard-layout {
      display: grid;
      gap: 1.5rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}

