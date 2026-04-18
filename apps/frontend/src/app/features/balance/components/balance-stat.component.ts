import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CardComponent } from '@packages/ui';
import { BalanceFacadeService } from '../balance-facade.service';

export type BalanceStatType = 'income' | 'expenses';

@Component({
  selector: 'app-balance-stat',
  imports: [CurrencyPipe, CardComponent],
  template: `
    <lib-card aria-live="polite">
      <p class="m-0 text-[0.7rem] font-semibold uppercase tracking-widest text-(--color-text-muted)">
        {{ config().label }}
      </p>

      @if (error()) {
        <p class="mt-3 text-[0.95rem] text-[#b42318]">{{ error() }}</p>
      } @else {
        <p
          class="mt-3 text-[clamp(1.25rem,5vw,2rem)] font-bold tracking-[-0.03em]"
          [class]="config().colorClass"
          [class.opacity-40]="isLoading() && !balance()"
        >
          {{ config().prefix }}{{ amount() | currency: 'USD' : 'symbol' : '1.2-2' }}
        </p>
      }
    </lib-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceStatComponent {
  readonly type = input.required<BalanceStatType>();

  private readonly balanceFacade = inject(BalanceFacadeService);

  readonly balance = this.balanceFacade.balance;
  readonly isLoading = this.balanceFacade.isLoading;
  readonly error = this.balanceFacade.error;

  readonly config = computed(() => {
    const configs: Record<BalanceStatType, { label: string; prefix: string; colorClass: string }> = {
      income: { label: 'Income', prefix: '+', colorClass: 'text-(--color-primary)' },
      expenses: { label: 'Expenses', prefix: '-', colorClass: 'text-[#9b3e2a]' },
    };
    return configs[this.type()];
  });

  readonly amount = computed(() => {
    const data = this.balance();
    return this.type() === 'income' ? data?.income : data?.expenses;
  });
}
