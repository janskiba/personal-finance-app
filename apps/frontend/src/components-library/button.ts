import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LucideDynamicIcon, LucideIconInput } from '@lucide/angular';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [LucideDynamicIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type()"
      [class]="classes()"
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabel()"
    >
      @if (icon()) {
        <svg [lucideIcon]="icon()!" [size]="iconSize()" class="shrink-0" aria-hidden="true"></svg>
      }

      <span class="inline-flex items-center">
        <ng-content></ng-content>
      </span>
    </button>
  `,
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly type = input<ButtonType>('button');
  readonly disabled = input(false);
  readonly fullWidth = input(false);
  readonly icon = input<LucideIconInput | null>(null);
  readonly ariaLabel = input<string | null>(null);

  readonly classes = computed(() => {
    const base =
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-colors select-none ' +
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 ' +
      'disabled:pointer-events-none disabled:opacity-50';

    const variantMap: Record<ButtonVariant, string> = {
      primary: 'bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800',
      secondary:
        'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 active:bg-slate-100',
      ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200',
      danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
    };

    const sizeMap: Record<ButtonSize, string> = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-5 text-base',
    };

    return [
      base,
      variantMap[this.variant()],
      sizeMap[this.size()],
      this.fullWidth() ? 'w-full' : '',
    ].join(' ');
  });

  readonly iconSize = computed(() => (this.size() === 'sm' ? 16 : this.size() === 'lg' ? 20 : 18));
}
