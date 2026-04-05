import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

type CardPadding = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="classes()">
      <ng-content />
    </div>
  `,
})
export class CardComponent {
  readonly padding = input<CardPadding>('md');
  readonly elevated = input(false);

  readonly classes = computed(() => {
    const base = 'rounded-xl bg-white';

    const paddingMap: Record<CardPadding, string> = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const shadow = this.elevated() ? 'shadow-md' : 'shadow-sm';

    return [base, paddingMap[this.padding()], shadow].filter(Boolean).join(' ');
  });
}
