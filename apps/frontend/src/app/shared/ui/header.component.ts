import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideDynamicIcon, LucideMoon, LucideUser } from '@lucide/angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideDynamicIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="flex h-14 items-center justify-end bg-(--color-surface) border-b border-(--color-border) px-4 gap-3"
    >
      <button
        type="button"
        aria-label="Toggle dark mode"
        class="rounded-lg p-2 text-(--color-text-muted) hover:bg-(--color-bg) hover:text-(--color-text) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) transition-colors"
      >
        <svg [lucideIcon]="moonIcon" [size]="20" aria-hidden="true"></svg>
      </button>

      <button
        type="button"
        aria-label="User profile"
        class="flex h-9 w-9 items-center justify-center rounded-full bg-(--color-primary) text-white hover:opacity-90 active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-surface) transition-colors"
      >
        <svg [lucideIcon]="userIcon" [size]="18" aria-hidden="true"></svg>
      </button>
    </header>
  `,
})
export class HeaderComponent {
  protected readonly moonIcon = LucideMoon;
  protected readonly userIcon = LucideUser;
}
