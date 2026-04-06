import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { LucideDynamicIcon, LucideX } from '@lucide/angular';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [LucideDynamicIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Backdrop -->
    <div
      class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      aria-hidden="true"
      (click)="closeDialog.emit()"
    ></div>

    <!-- Panel -->
    <div
      role="dialog"
      aria-modal="true"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div [class]="panelClasses()">
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <h2 class="text-lg font-semibold text-slate-900">
            <ng-content select="[dialog-title]" />
          </h2>
          <button
            type="button"
            class="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
            aria-label="Close dialog"
            (click)="closeDialog.emit()"
          >
            <svg [lucideIcon]="xIcon" [size]="20" aria-hidden="true"></svg>
          </button>
        </div>

        <!-- Body -->
        <div class="overflow-y-auto px-6 py-5">
          <ng-content select="[dialog-content]" />
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <ng-content select="[dialog-actions]" />
        </div>
      </div>
    </div>
  `,
})
export class DialogComponent {
  readonly closeDialog = output<void>();
  readonly width = input<'sm' | 'md' | 'lg' | 'xl'>('md');

  protected readonly xIcon = LucideX;

  protected readonly panelClasses = computed(() => {
    const widthMap = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
    };
    return `relative flex max-h-[80vh] w-full ${widthMap[this.width()]} flex-col rounded-2xl bg-white shadow-xl`;
  });
}
