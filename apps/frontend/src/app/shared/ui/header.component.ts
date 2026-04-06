import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideDynamicIcon, LucideMoon, LucideUser } from '@lucide/angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LucideDynamicIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="flex h-14 items-center justify-end bg-slate-100 border-b border-slate-200 px-4 gap-3"
    >
      <button
        type="button"
        aria-label="Toggle dark mode"
        class="rounded-lg p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 transition-colors"
      >
        <svg [lucideIcon]="moonIcon" [size]="20" aria-hidden="true"></svg>
      </button>

      <button
        type="button"
        aria-label="User profile"
        class="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 transition-colors"
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
