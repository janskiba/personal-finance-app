import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { LucidePlus } from '@lucide/angular';
import { Store } from '@ngrx/store';
import { ButtonComponent, CardComponent } from '@packages/ui';
import { BalanceActions } from '../state/balance.actions';
import { selectData, selectError, selectLoading } from '../state/balance.selectors';

@Component({
  selector: 'app-balance',
  imports: [CardComponent, ButtonComponent],
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
        <span> $ {{ balance()?.balance }}</span>
      </p>
    }

    <div class="mt-6">
      <lib-button size="lg" [icon]="plusIcon" ariaLabel="Create new transaction">
        New transaction
      </lib-button>
    </div>
  </lib-card>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceComponent implements OnInit {
  private readonly store = inject(Store);
  protected readonly plusIcon = LucidePlus;

  readonly balance = this.store.selectSignal(selectData);
  readonly isLoading = this.store.selectSignal(selectLoading);
  readonly error = this.store.selectSignal(selectError);

  ngOnInit(): void {
    this.store.dispatch(BalanceActions.loadBalance());
  }
}
