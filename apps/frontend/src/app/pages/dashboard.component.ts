import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BalanceComponent } from '../features/balance/components/balance.component';

@Component({
  selector: 'app-dashboard',
  imports: [BalanceComponent],
  template: `<section class="dashboard-layout">
    <app-balance />
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

