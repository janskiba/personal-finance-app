import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Category } from '@packages/types';

export type ChipVariant = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'neutral';
export type ChipSize = 'sm' | 'md';

const VARIANT_CLASSES: Record<ChipVariant, string> = {
  success: 'bg-green-100 text-green-800',
  info: 'bg-sky-100 text-sky-800',
  warning: 'bg-violet-100 text-violet-800',
  primary: 'bg-amber-100 text-amber-800',
  danger: 'bg-red-100 text-red-800',
  neutral: 'bg-gray-100 text-gray-700',
};

const SIZE_CLASSES: Record<ChipSize, string> = {
  sm: 'px-2.5 py-0.5 text-xs font-semibold',
  md: 'px-3 py-1 text-sm font-medium',
};

export const CHIP_CLASSES: Record<Category, ChipVariant> = {
  Food: 'success',
  Transport: 'info',
  Entertainment: 'warning',
  Utilities: 'primary',
  Other: 'neutral',
};

@Component({
  selector: 'lib-chip',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (selectable()) {
      <button
        type="button"
        [class]="buttonClasses()"
        (click)="clicked.emit(value())"
        [attr.aria-pressed]="selected()"
      >
        {{ value() }}
      </button>
    } @else {
      <span [class]="chipClasses()">
        {{ value() }}
      </span>
    }
  `,
})
export class ChipComponent {
  readonly value = input.required<string>();
  readonly variant = input<ChipVariant>('neutral');
  readonly size = input<ChipSize>('sm');
  readonly selectable = input<boolean>(false);
  readonly selected = input<boolean>(false);
  readonly clicked = output<string>();

  readonly chipClasses = computed(() => {
    const variant = VARIANT_CLASSES[this.variant()];
    const size = SIZE_CLASSES[this.size()];
    return `${variant} ${size} rounded inline-block`;
  });

  readonly buttonClasses = computed(() => {
    const variant = VARIANT_CLASSES[this.variant()];
    const size = SIZE_CLASSES[this.size()];
    const selectedClass = this.selected() ? 'ring-2 ring-offset-2 ring-(--color-primary)' : '';
    return `${variant} ${size} rounded inline-flex items-center justify-center border-none cursor-pointer transition-all duration-200 ease-in-out hover:opacity-80 focus-visible:outline-none ${selectedClass}`;
  });
}
